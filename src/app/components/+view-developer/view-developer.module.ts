import {NgModule} from '@angular/core';
import {ActiveStoryModule} from '../active-story/active-story.module';
import {ViewDeveloperComponent} from './view-developer.component';
import {StoryListModule} from '../story-list/story-list.module';

@NgModule({
  imports: [ActiveStoryModule, StoryListModule],
  declarations: [ViewDeveloperComponent],
  exports: [ViewDeveloperComponent]
})
export class ViewDeveloperModule {
}
