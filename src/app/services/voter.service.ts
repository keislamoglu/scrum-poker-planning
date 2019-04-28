import {Injectable} from '@angular/core';
import {VoterRepoService} from '../repositories';
import {Voter} from '../entities';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class VoterService {
  private _voter: Voter | null;

  get voter() {
    if (!this._voter) {
      this._voter = this._getFromLocalStorage();
    }
    return this._voter;
  }

  constructor(private voterRepoService: VoterRepoService,
              private sessionService: SessionService) {
  }

  createVoter(nick: string, type: 'dev' | 'master'): Observable<Voter> {
    const sessionId = this.sessionService.getSessionId();

    return this.voterRepoService.add({nick, type, sessionId}).pipe(
      map(voter => {
        this._setVoter(voter);
        return voter;
      })
    );
  }

  private _setVoter(voter: Voter) {
    this._voter = voter;
    this._saveToLocalStorage();
  }

  private _saveToLocalStorage() {
    const sessionId = this.sessionService.getSessionId();
    localStorage.setItem(`voter_${sessionId}`, JSON.stringify(this.voter));
  }

  private _getFromLocalStorage() {
    const sessionId = this.sessionService.getSessionId();
    const voterJSON = localStorage.getItem(`voter_${sessionId}`);
    return voterJSON ? JSON.parse(voterJSON) : null;
  }
}
