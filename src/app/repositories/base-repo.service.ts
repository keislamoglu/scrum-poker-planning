import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG} from '../app-config';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
export abstract class BaseRepoService<T extends { id: string }> {
  protected baseURL = APP_CONFIG.api.uri;
  protected abstract repoAPIPath: string;

  constructor(protected httpClient: HttpClient) {
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiURL());
  }

  get(id: string): Observable<T> {
    return this.httpClient.get<T>(this.apiURL(id));
  }

  add(data: Omit<T, 'id'>): Observable<T> {
    return this.httpClient.post<T>(this.apiURL(), data);
  }

  update(id: string, data: T): Observable<void> {
    return this.httpClient.put<void>(this.apiURL(id), data);
  }

  remove(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiURL(id));
  }

  protected apiURL(path?: string) {
    let url = `${this.baseURL}/${this.repoAPIPath.replace(/^\//, '')}`;
    if (path) {
      url += `/${path.replace(/^\//, '')}`;
    }
    return url;
  }
}
