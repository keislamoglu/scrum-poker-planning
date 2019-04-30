import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActiveStoryComponent} from './active-story.component';
import {Story} from '../../entities';
import {StoryRepoService, VoteRepoService} from '../../repositories';
import {of} from 'rxjs';
import {VoterService} from '../../services';
import {CommonModule} from '@angular/common';

describe('ActiveStoryComponent', () => {
  let fixture: ComponentFixture<ActiveStoryComponent>;
  let component: ActiveStoryComponent;
  let testingStoryList: Story[] = [];
  const testingStoryRepoService = {
    get: jasmine.createSpy('get story')
      .and.callFake((id: string) => of(testingStoryList.find(t => id === t.id)))
  };
  const testingVoteRepoService = {
    getByCriteria: jasmine.createSpy('voteRepoGetByCriteria').and.returnValue(of(void 0)),
    add: jasmine.createSpy('voteRepoAdd').and.returnValue(of(void 0))
  };
  const testingVoterService = {
    voter: {
      id: 'voter-1',
      nick: 'Voter 1',
      sessionId: 'session-1',
      type: 'dev'
    }
  };

  beforeEach(async(() => {
    TestBed.overrideComponent(ActiveStoryComponent, {
      set: {
        providers: [{provide: VoterService, useValue: testingVoterService}]
      }
    });
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ActiveStoryComponent],
      providers: [
        {provide: StoryRepoService, useValue: testingStoryRepoService},
        {provide: VoteRepoService, useValue: testingVoteRepoService},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    testingStoryList = [
      {id: 'story-1', title: 'Story 1', sessionId: 'session-1'},
      {id: 'story-2', title: 'Story 2', sessionId: 'session-1'},
    ];
    fixture = TestBed.createComponent(ActiveStoryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load story', async () => {
    component.loadStory('story-1');
    await fixture.whenStable();
    expect(component.story).toEqual(testingStoryList[0]);
  });

  it('#sendVote() should send vote for the story', () => {
    const voter = testingVoterService.voter;
    const point = '5';
    component.storyId = 'story-1';
    component.sendVote(point);
    expect(testingVoteRepoService.getByCriteria).toHaveBeenCalledWith({
      voterId: voter.id,
      storyId: component.storyId
    });
    expect(testingVoteRepoService.add).toHaveBeenCalledWith({
      voterId: voter.id,
      storyId: component.storyId,
      point
    });
  });
});
