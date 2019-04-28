import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {VoteRepoService} from './vote-repo.service';

describe('VoteRepoService', () => {
  let service: VoteRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoteRepoService],
    });
    service = TestBed.get(VoteRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
