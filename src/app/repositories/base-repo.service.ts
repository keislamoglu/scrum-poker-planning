import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';

/**
 * T generic type refers to the entity type that will be used in the relevant repository.
 * Example:
 * ```
 * export class SessionRepoService extends BaseRepoService<Session> {
 *     ...
 * }
 * ```
 * where `Session` is the entity type, `SessionRepoService` is the repository service for `Session`.
 */
@Injectable({providedIn: RepositoriesModule})
export class BaseRepoService<T> {
}
