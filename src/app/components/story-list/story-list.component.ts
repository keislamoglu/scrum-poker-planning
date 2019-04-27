import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Story} from '../../entities';
import {StoryRepoService} from '../../repositories';

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnDestroy {
  @Input() sessionId: string;
  @Output() storyChange = new EventEmitter();
  timer: any;
  storyList: Story[] = [];
  activeStoryId: string;

  constructor(private storyRepoService: StoryRepoService) {
  }

  ngOnInit(): void {
    this.loadList();
    this.timer = setInterval(() => this.loadList(), 2000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  loadList() {
    this.storyRepoService.getBySession(this.sessionId).subscribe(storyList => {
      this.storyList = storyList;
      const notVotedStoryList = storyList.filter(t => t.point === undefined);
      if (notVotedStoryList.length > 0) {
        this.activeStoryId = notVotedStoryList[0].id;
        this.storyChange.emit(this.activeStoryId);
      } else {
        this.storyChange.emit(null);
      }
    });
  }

  getStatus(story: Story) {
    if (story.id === this.activeStoryId) {
      return 'Active';
    }
    return story.point === undefined ? 'Not Voted' : 'Voted';
  }
}
