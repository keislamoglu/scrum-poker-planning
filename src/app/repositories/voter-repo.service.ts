import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {BaseRepoService} from './base-repo.service';
import {Voter} from '../entities';
import {Observable} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class VoterRepoService extends BaseRepoService<Voter> {
  protected repoAPIPath = '/voter';

  getBySession(sessionId: string): Observable<Voter[]> {
    return this.httpClient.get<Voter[]>(this.apiURL(`/by-session/${sessionId}`));
  }
}
