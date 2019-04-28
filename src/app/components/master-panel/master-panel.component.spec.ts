import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MasterPanelComponent} from './master-panel.component';
import {StoryRepoService, VoteRepoService, VoterRepoService} from '../../repositories';
import {Story} from '../../entities';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

describe('MasterPanelComponent', () => {
  let fixture: ComponentFixture<MasterPanelComponent>;
  let component: MasterPanelComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [MasterPanelComponent],
      providers: [
        {provide: StoryRepoService},
        {provide: VoterRepoService},
        {provide: VoteRepoService}
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

  it('should load story information', async () => {
    fixture.detectChanges();
    const storyId = 'story-1';
    const story: Story = {
      title: 'Story 1',
      id: storyId,
      sessionId: 'session-1',
    };
    component.loadStory(storyId);
    await fixture.whenStable();
    expect(component.story).toEqual(story);
  });

  it(`should load all voters' information`, () => {
  });

  it('should check whether all voters have voted', () => {
  });

  it('should set story point', () => {
  });
});
