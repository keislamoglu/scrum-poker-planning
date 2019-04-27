import {Component} from '@angular/core';
import {Story} from '../../entities';

@Component({
  templateUrl: './story-textarea.component.html',
  styleUrls: ['./story-textarea.component.scss']
})
export class StoryTextareaComponent {
  content: string;

  splitLines(): string[] {
    return this.content.split('\n').filter(t => t);
  }

  getStoryList(): Story[] {
    return this.splitLines().map(line => {
      return {title: line, id: void 0, sessionId: void 0};
    });
  }
}
