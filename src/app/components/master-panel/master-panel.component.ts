import {Component, OnDestroy, OnInit} from '@angular/core';
import {Session, Story, Vote, Voter} from '../../entities';
import {StoryRepoService, VoteRepoService, VoterRepoService} from '../../repositories';
import {SessionService} from '../../services';
import {zip} from 'rxjs';

@Component({
  selector: 'app-master-panel',
  templateUrl: './master-panel.component.html',
  styleUrls: ['./master-panel.component.scss']
})
export class MasterPanelComponent implements OnInit, OnDestroy {
  voters: Voter[] = [];
  votes: Vote[] = [];
  story: Story | null = null;
  session: Session;
  sessionId;
  allVoted = false;
  timer: any;

  constructor(private storyRepoService: StoryRepoService,
              private voterRepoService: VoterRepoService,
              private voteRepoService: VoteRepoService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.sessionService.getSessionId();
    this.sessionService.getSession().subscribe(session => {
      this.session = session;
      this.timer = setInterval(() => this.loadVotes(), 2000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  loadStory(storyId: string) {
    this.storyRepoService.get(storyId).subscribe(story => {
      if (this.story == null || (this.story && this.story.id !== story.id)) {
        this.allVoted = false;
        this.story = story;
      }
    });
  }

  loadVotes() {
    if (this.allVoted || !this.story) {
      return;
    }
    zip(
      this.voteRepoService.getByStory(this.story.id),
      this.voterRepoService.getBySession(this.sessionId)
    ).subscribe(([votes, voters]) => {
      this.votes = votes;
      this.voters = voters;
      if (this.votes.length === this.session.numberOfVoters) {
        this.allVoted = true;
      }
    });
  }

  getVote(voterId: string) {
    const vote = this.votes.find(t => t.voterId === voterId);
    return vote ? this.allVoted ? vote.point : 'Voted' : 'Not Voted';
  }

  endVoting() {
    if (this.story != null && this.allVoted) {
      this.storyRepoService.update(this.story.id, this.story).subscribe();
    }
  }
}
