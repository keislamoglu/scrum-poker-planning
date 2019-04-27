import {NgModule} from '@angular/core';
import {StoryListComponent} from './story-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [StoryListComponent],
  exports: [StoryListComponent]
})
export class StoryListModule {
}
