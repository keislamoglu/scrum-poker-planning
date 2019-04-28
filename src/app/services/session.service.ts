import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionRepoService} from '../repositories';
import {Observable} from 'rxjs';
import {Session} from '../entities';

@Injectable({providedIn: 'root'})
export class SessionService {
  constructor(private route: ActivatedRoute,
              private sessionRepoService: SessionRepoService) {
  }

  getSessionId() {
    return this.route.snapshot.paramMap.get('sessionId');
  }

  getSession(): Observable<Session> {
    return this.sessionRepoService.get(this.getSessionId());
  }
}
