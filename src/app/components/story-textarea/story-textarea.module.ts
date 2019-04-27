import {NgModule} from '@angular/core';
import {StoryTextareaComponent} from './story-textarea.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  declarations: [StoryTextareaComponent],
  exports: [StoryTextareaComponent],
})
export class StoryTextareaModule {
}
