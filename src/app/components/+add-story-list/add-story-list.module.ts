import {NgModule} from '@angular/core';
import {StoryTextareaModule} from '../story-textarea/story-textarea.module';
import {AddStoryListComponent} from './add-story-list.component';

@NgModule({
  imports: [StoryTextareaModule],
  declarations: [AddStoryListComponent],
  exports: [AddStoryListComponent]
})
export class AddStoryListModule {
}
