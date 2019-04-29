import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService, VoterService} from '../../services';
import {Voter} from '../../entities';
import {ActiveStoryComponent} from '../active-story/active-story.component';

@Component({
  templateUrl: './view-developer.component.html',
  styleUrls: ['./view-developer.component.scss'],
  providers: [VoterService, SessionService]
})
export class ViewDeveloperComponent implements OnInit {
  @ViewChild('activeStory') activeStory: ActiveStoryComponent;
  voter: Voter;
  sessionId: string;
  ended = false;

  constructor(private voterService: VoterService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.sessionService.getSessionId();
    if (!this.voterService.voter) {
      const nick = prompt('Please enter a nick');
      this.voterService.createVoter(nick, 'dev', this.sessionService.getSessionId()).subscribe(voter => {
        this.voter = voter;
      });
    }
  }

  onStoryChange(activeStoryId: string) {
    if (this.ended) {
      return;
    }
    if (activeStoryId === null) {
      this.ended = true;
    }
    this.activeStory.loadStory(activeStoryId);
  }
}
