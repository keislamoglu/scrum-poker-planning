import {Component, OnDestroy, OnInit} from '@angular/core';
import {Story, Vote, Voter} from '../../entities';
import {StoryRepoService, VoteRepoService, VoterRepoService} from '../../repositories';
import {SessionService} from '../../services';

@Component({
  selector: 'app-master-panel',
  templateUrl: './master-panel.component.html',
  styleUrls: ['./master-panel.component.scss']
})
export class MasterPanelComponent implements OnInit, OnDestroy {
  votes: { vote: Vote, voter: Voter }[] = [];
  story: Story | null = null;
  sessionId;
  allVoted = false;
  timer: number;

  constructor(private storyRepoService: StoryRepoService,
              private voterRepoService: VoterRepoService,
              private voteRepoService: VoteRepoService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.sessionService.getSessionId();
    this.timer = setInterval(() => this.loadVotes(), 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  loadStory(storyId: string) {
    this.allVoted = false;
    this.story = null;
    this.storyRepoService.get(storyId).subscribe(story => this.story = story);
  }

  loadVoters() {
    this.voterRepoService.getBySession(this.sessionId).subscribe(voters => {
      this.votes = voters.map(voter => ({vote: void 0, voter}));
    });
  }

  loadVotes() {
    this.voteRepoService.getBySession(this.sessionId).subscribe(votes => {
      this.votes.map(vote => {
        vote.vote = votes.find(v => v.voterId === vote.voter.id);
        return vote;
      });
      if (this.votes.every(v => v.vote !== undefined)) {
        this.allVoted = true;
      }
    });
  }

  setStoryPoint() {
    if (this.story != null && this.allVoted) {
      this.storyRepoService.update(this.story.id, this.story).subscribe();
    }
  }
}
