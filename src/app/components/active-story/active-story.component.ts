import {Component, Input, OnInit} from '@angular/core';
import {Story} from '../../entities';
import {StoryRepoService, VoteRepoService} from '../../repositories';
import {VoterService} from '../../services';
import {APP_CONFIG} from '../../app-config';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-active-story',
  templateUrl: './active-story.component.html',
  styleUrls: ['./active-story.component.scss']
})
export class ActiveStoryComponent implements OnInit {
  @Input() storyId: string;
  story: Story;
  points = APP_CONFIG.points;
  point: string;

  constructor(private storyRepoService: StoryRepoService,
              private voteRepoService: VoteRepoService,
              private voterService: VoterService) {
  }

  ngOnInit(): void {
    this.storyRepoService.get(this.storyId).subscribe(story => {
      this.story = story;
    });
  }

  sendVote(point: string) {
    const voter = this.voterService.voter;
    // check whether there is a vote already
    // if no, create a new one,
    // if yes, update the existing one
    this.voteRepoService.getByCriteria({storyId: this.storyId, voterId: voter.id}).pipe(
      switchMap(vote => {
          return vote
            ? this.voteRepoService.update(vote.id, vote)
            : this.voteRepoService.add({voterId: voter.id, point, storyId: this.storyId})
              .pipe(map(() => void 0));
        }
      )
    ).subscribe(() => {
      this.point = point;
    });
  }
}
