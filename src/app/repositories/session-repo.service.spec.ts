import {SessionRepoService} from './session-repo.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SessionRepoService', () => {
  let service: SessionRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionRepoService]
    });
    service = TestBed.get(SessionRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
