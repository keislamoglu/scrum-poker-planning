import {SessionService} from './session.service';
import {Session} from '../entities';
import {of} from 'rxjs';

describe('SessionService', () => {
  let service: SessionService;
  const testingSession: Session = {
    id: 'session-1',
    name: 'Session 1',
    numberOfVoters: 5,
    activeStoryId: void 0
  };
  const testingRoute: any = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('routeParamGet').and.returnValue(testingSession.id)
      }
    }
  };
  const testingSessionRepoService: any = {
    get: jasmine.createSpy('sessionRepoGet').and.returnValue(of(testingSession))
  };

  beforeEach(() => {
    service = new SessionService(testingRoute, testingSessionRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get session id', () => {
    expect(service.getSessionId()).toEqual(testingSession.id);
  });

  it('should get session', async () => {
    const session = await service.getSession().toPromise();
    expect(session).toEqual(testingSession);
  });
});
