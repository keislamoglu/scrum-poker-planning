import {VoterService} from './voter.service';
import {Voter} from '../entities';
import {of} from 'rxjs';

describe('VoterService', () => {
  let service: VoterService;
  const sessionId = 'session-1';
  const testingVoterRepoService: any = {
    add: jasmine.createSpy('voterRepoAdd').and.callFake((voter: Voter) => {
      voter.id = 'voter-1';
      return of(voter);
    })
  };
  const testingSessionService: any = {
    getSessionId: jasmine.createSpy('sessionServiceGetId').and.returnValue(sessionId)
  };

  beforeEach(() => {
    service = new VoterService(testingVoterRepoService, testingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create voter', async () => {
    const testingVoter: Voter = {
      id: 'voter-1',
      nick: 'Nick',
      type: 'dev',
      sessionId
    };
    const voter = await service.createVoter('Nick', 'dev', sessionId).toPromise();
    expect(voter).toEqual(testingVoter);
  });

  it('should save to localStorage when voter is set', async () => {
    spyOn(localStorage, 'setItem');
    const voter = await service.createVoter('Nick', 'dev', sessionId).toPromise();
    expect(localStorage.setItem).toHaveBeenCalledWith(`voter_${sessionId}`, JSON.stringify(voter));
  });

  it('should get from localStorage when voter is not set', () => {
    const testingVoter: Voter = {
      id: 'voter-1',
      nick: 'Nick',
      type: 'dev',
      sessionId
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(testingVoter));
    expect(service.voter).toEqual(testingVoter);
  });
});
