import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {StoryListComponent} from './story-list.component';
import {StoryRepoService} from '../../repositories';
import {of} from 'rxjs';
import {Story} from '../../entities';

describe('StoryListComponent', () => {
  let fixture: ComponentFixture<StoryListComponent>;
  let component: StoryListComponent;
  let storyList: Story[] = [];
  const storyRepoService = {
    getBySession: jasmine.createSpy().and.callFake(() => of(storyList))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [StoryListComponent],
      providers: [
        {provide: StoryRepoService, useValue: storyRepoService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    storyList = [
      {id: 'story-1', title: 'Story 1', point: 5, sessionId: 'session-1'},
      {id: 'story-2', title: 'Story 2', point: 13, sessionId: 'session-1'},
      {id: 'story-3', title: 'Story 3', point: void 0, sessionId: 'session-1'},
      {id: 'story-4', title: 'Story 4', point: void 0, sessionId: 'session-1'}
    ];
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('#getStatus should get story current status', () => {
    const status = (story) => component.getStatus(story);
    component.activeStoryId = storyList[1].id;
    expect([
      status(storyList[0]),
      status(storyList[1]),
      status(storyList[2])
    ]).toEqual(['Voted', 'Active', 'Not Voted']);
  });

  describe('async', () => {
    beforeEach(() => {
      jasmine.clock().install();
      fixture.detectChanges();
    });

    afterEach(() => jasmine.clock().uninstall());


    it('should fetch data on every two seconds until destroy', () => {
      spyOn(component, 'loadList').and.callThrough();

      const timer = setInterval(() => {
        expect(component.loadList).toHaveBeenCalled();
        (component.loadList as jasmine.Spy).calls.reset();
      }, 2001);

      setTimeout(() => {
        fixture.destroy();
        clearInterval(timer);
      }, 4003);

      jasmine.clock().tick(4004);

      expect(component.loadList).not.toHaveBeenCalled();
    });

    it('should trigger when active story changed', () => {
      const activeStoryId = component.activeStoryId;
      storyList[2].point = 13;

      jasmine.clock().tick(2001);

      expect(component.activeStoryId).not.toEqual(activeStoryId);
      expect(component.activeStoryId).toEqual('story-4');
    });

    it('should trigger with null when stories ended', () => {
      spyOn(component.storyChange, 'emit');
      storyList[2].point = 13;
      storyList[3].point = 50;

      jasmine.clock().tick(2001);

      expect(component.storyChange.emit).toHaveBeenCalledWith(null);
    });
  });
});
