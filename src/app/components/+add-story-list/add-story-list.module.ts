import {NgModule} from '@angular/core';
import {StoryTextareaModule} from '../story-textarea/story-textarea.module';
import {AddStoryListComponent} from './add-story-list.component';
import {AddStoryListRoutingModule} from './add-story-list-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    StoryTextareaModule,
    AddStoryListRoutingModule,
    FormsModule
  ],
  declarations: [AddStoryListComponent],
  exports: [
    AddStoryListComponent,
    AddStoryListRoutingModule
  ]
})
export class AddStoryListModule {
}
