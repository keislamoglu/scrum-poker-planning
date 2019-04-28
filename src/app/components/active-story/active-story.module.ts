import {NgModule} from '@angular/core';
import {ActiveStoryComponent} from './active-story.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ActiveStoryComponent],
  exports: [ActiveStoryComponent]
})
export class ActiveStoryModule {
}
