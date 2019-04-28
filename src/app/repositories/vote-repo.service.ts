import {BaseRepoService} from './base-repo.service';
import {Vote} from '../entities';
import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class VoteRepoService extends BaseRepoService<Vote> {
  protected repoAPIPath = '/vote';
}
