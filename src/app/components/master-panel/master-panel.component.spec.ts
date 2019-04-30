import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MasterPanelComponent} from './master-panel.component';
import {StoryRepoService, VoteRepoService, VoterRepoService} from '../../repositories';
import {Session, Story} from '../../entities';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SessionService} from '../../services';
import {of, Subject} from 'rxjs';

describe('MasterPanelComponent', () => {
  let fixture: ComponentFixture<MasterPanelComponent>;
  let component: MasterPanelComponent;

  const testingSessionId = 'session-1';
  const testingSession: Session = {
    id: testingSessionId,
    name: 'Session 1',
    numberOfVoters: 5,
    activeStoryId: void 0
  };
  const testingStoryId = 'story-1';
  const testingStory: Story = {
    title: 'Story 1',
    id: testingStoryId,
    sessionId: 'session-1',
  };
  const testingStory$ = new Subject<Story>();
  const testingSessionService: Partial<SessionService> = {
    getSessionId: jasmine.createSpy('sessionServiceGetSessionId').and.returnValue(testingSessionId),
    getSession: jasmine.createSpy('sessionServiceGetSession').and.returnValue(testingStory$.asObservable())
  };
  const testingStoryRepoService: any = {
    get: jasmine.createSpy('storyRepoServiceGet').and.returnValue(of(testingStory))
  };
  const testingVoterRepoService: Partial<VoterRepoService> = {};
  const testingVoteRepoService: Partial<VoteRepoService> = {};

  beforeEach(async(() => {
    TestBed.overrideComponent(MasterPanelComponent, {
      set: {
        providers: [{provide: SessionService, useValue: testingSessionService}]
      }
    });
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [MasterPanelComponent],
      providers: [
        {provide: StoryRepoService, useValue: testingStoryRepoService},
        {provide: VoterRepoService, useValue: testingVoterRepoService},
        {provide: VoteRepoService, useValue: testingVoteRepoService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPanelComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load story information', (done) => {
    fixture.detectChanges();
    testingStory$.asObservable().subscribe(() => {
      expect(component.story).toEqual(testingStory);
      done();
    });
    component.loadStory(testingStoryId);
    testingStory$.next(testingStory);
  });

  it(`should load all voters' information`, () => {
  });

  it('should check whether all voters have voted', () => {
  });

  it('should set story point', () => {
  });
});
