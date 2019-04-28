import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../services';
import {StoryListComponent} from '../story-list/story-list.component';

@Component({
  templateUrl: './view-master.component.html',
  styleUrls: ['./view-master.component.scss']
})
export class ViewMasterComponent implements OnInit {
  @ViewChild('storyList') storyList: StoryListComponent;
  sessionId: string;
  activeStoryId: string;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.sessionService.getSessionId();
    this.storyList.storyChange
      .subscribe(activeStoryId => this.activeStoryId = activeStoryId);
  }
}
