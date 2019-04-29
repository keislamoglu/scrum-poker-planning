import {NgModule} from '@angular/core';
import {MasterPanelModule} from '../master-panel/master-panel.module';
import {ActiveStoryModule} from '../active-story/active-story.module';
import {StoryListModule} from '../story-list/story-list.module';
import {ViewMasterComponent} from './view-master.component';
import {ViewMasterRoutingModule} from './view-master-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    StoryListModule,
    MasterPanelModule,
    ActiveStoryModule,
    ViewMasterRoutingModule
  ],
  declarations: [ViewMasterComponent],
  exports: [ViewMasterComponent, ViewMasterRoutingModule]
})
export class ViewMasterModule {
}
