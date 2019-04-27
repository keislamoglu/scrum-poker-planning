import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {StoryTextareaComponent} from './story-textarea.component';
import {Story} from '../../entities';

describe('StoryTextareaComponent', () => {
  let fixture: ComponentFixture<StoryTextareaComponent>;
  let component: StoryTextareaComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [StoryTextareaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTextareaComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should split lines to obtain as array items', () => {
    component.content = 'Line 1\nLine 2\nLine 3\n\n\n';
    expect(component.splitLines()).toEqual(['Line 1', 'Line 2', 'Line 3']);
  });

  it('should get as story object list', () => {
    const storyList: Story[] = [
      {id: void 0, title: 'Line 1', sessionId: void 0},
      {id: void 0, title: 'Line 2', sessionId: void 0},
    ];
    component.content = 'Line 1\nLine 2';
    expect(component.getStoryList()).toEqual(storyList);
  });
});
