import {NgModule} from '@angular/core';
import {ActiveStoryModule} from '../active-story/active-story.module';
import {ViewDeveloperComponent} from './view-developer.component';
import {StoryListModule} from '../story-list/story-list.module';
import {ViewDeveloperRoutingModule} from './view-developer-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ActiveStoryModule,
    StoryListModule,
    ViewDeveloperRoutingModule,
  ],
  declarations: [ViewDeveloperComponent],
  exports: [
    ViewDeveloperComponent,
    ViewDeveloperRoutingModule
  ]
})
export class ViewDeveloperModule {
}
