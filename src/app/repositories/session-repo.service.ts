import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {BaseRepoService} from './base-repo.service';
import {Session} from '../entities';

@Injectable({providedIn: RepositoriesModule})
export class SessionRepoService extends BaseRepoService<Session> {
  protected repoAPIPath = '/session';
}
