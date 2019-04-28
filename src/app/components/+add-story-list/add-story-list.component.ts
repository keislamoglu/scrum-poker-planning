import {Component} from '@angular/core';
import {Session} from '../../entities';
import {SessionRepoService} from '../../repositories';

@Component({
  templateUrl: './add-story-list.component.html',
  styleUrls: ['./add-story-list.component.scss']
})
export class AddStoryListComponent {
  session: Session = {
    id: void 0,
    numberOfVoters: void 0,
    activeStoryId: void 0,
    name: '',
  };

  constructor(private sessionRepoService: SessionRepoService) {
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
      this.sessionRepoService.add(this.session).subscribe(session => {
        // TODO: redirect to view-master
        alert('created');
      });
    }
  }
}
