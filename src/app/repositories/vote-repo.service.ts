import {BaseRepoService} from './base-repo.service';
import {Vote} from '../entities';
import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {Observable} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class VoteRepoService extends BaseRepoService<Vote> {
  protected repoAPIPath = '/vote';

  getByCriteria(criteria: { storyId: string, voterId: string }): Observable<Vote> {
    return this.httpClient.get<Vote>(this.apiURL('by-criteria'), {params: criteria});
  }

  getBySession(sessionId: string): Observable<Vote[]> {
    return this.httpClient.get<Vote[]>(this.apiURL(`by-session/${sessionId}`));
  }
}
