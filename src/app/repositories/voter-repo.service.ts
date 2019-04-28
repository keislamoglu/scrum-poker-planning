import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {BaseRepoService} from './base-repo.service';
import {Voter} from '../entities';

@Injectable({providedIn: RepositoriesModule})
export class VoterRepoService extends BaseRepoService<Voter> {
  protected repoAPIPath = '/voter';
}
