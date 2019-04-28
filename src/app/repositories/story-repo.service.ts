import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {BaseRepoService} from './base-repo.service';
import {Story} from '../entities';
import {Observable} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class StoryRepoService extends BaseRepoService<Story> {
  protected repoAPIPath = '/story';

  getBySession(sessionId: string): Observable<Story[]> {
    return this.httpClient.get<Story[]>(this.apiURL(`/by-session/${sessionId}`));
  }
}
