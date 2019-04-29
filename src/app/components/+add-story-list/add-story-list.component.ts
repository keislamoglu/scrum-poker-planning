import {Component, ViewChild} from '@angular/core';
import {Session} from '../../entities';
import {SessionRepoService, StoryRepoService} from '../../repositories';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {StoryTextareaComponent} from '../story-textarea/story-textarea.component';
import {SessionService, VoterService} from '../../services';

@Component({
  templateUrl: './add-story-list.component.html',
  styleUrls: ['./add-story-list.component.scss'],
  providers: [VoterService, SessionService]
})
export class AddStoryListComponent {
  @ViewChild('textarea') textareaComponent: StoryTextareaComponent;

  session: Session = {
    id: void 0,
    numberOfVoters: void 0,
    activeStoryId: void 0,
    name: '',
  };
  nick: string;

  constructor(private sessionRepoService: SessionRepoService,
              private storyRepoService: StoryRepoService,
              private voterService: VoterService,
              private router: Router) {
  }

  /**
   * Should not be empty or undefined
   * Length should be <=200
   */
  validateSessionName(): boolean {
    return this.session.name != null && this.session.name.length > 0 && this.session.name.length <= 200;
  }

  /**
   * Should not be empty or less than 1
   */
  validateNumberOfVoters(): boolean {
    return this.session.numberOfVoters != null && this.session.numberOfVoters > 0;
  }

  startSession() {
    if (!this.validateSessionName()) {
      alert('Please enter valid session name (>0 and <=200)');
    }

    if (!this.validateNumberOfVoters()) {
      alert('Please enter valid number of voters (>0)');
    }

    const isValid = this.validateSessionName() && this.validateNumberOfVoters();

    if (isValid) {
      this.sessionRepoService.add(this.session).pipe(
        switchMap(session => {
          this.session = session;
          return forkJoin(this.textareaComponent.getStoryList().map(story => {
            story.sessionId = session.id;
            return this.storyRepoService.add(story);
          }));
        }),
        switchMap(() => {
          return this.voterService.createVoter(this.nick, 'master', this.session.id);
        })
      ).subscribe(() => {
        this.router.navigateByUrl(`/view-master/${this.session.id}`);
      });
    }
  }
}
