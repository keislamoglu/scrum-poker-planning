import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {VoterRepoService} from './voter-repo.service';

describe('VoterRepoService', () => {
  let service: VoterRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoterRepoService],
    });
    service = TestBed.get(VoterRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
