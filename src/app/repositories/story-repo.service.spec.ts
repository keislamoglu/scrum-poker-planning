import {StoryRepoService} from './story-repo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Story} from '../entities';
import {APP_CONFIG} from '../app-config';

describe('StoryRepoService', () => {
  let service: StoryRepoService;
  let testingHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryRepoService]
    });
    service = TestBed.get(StoryRepoService);
    testingHttpClient = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getBySession() should get storyList by sessionId', (done) => {
    const testingStoryList: Story[] = [
      {id: 'story-1', sessionId: 'session-1', title: 'Story 1'}
    ];
    service.getBySession('session-1').subscribe(storyList => {
      expect(storyList).toEqual(testingStoryList);
      done();
    });
    testingHttpClient.expectOne(APP_CONFIG.api.uri + '/story/by-session/session-1').flush(testingStoryList);
  });
});
