import {NgModule} from '@angular/core';
import {MasterPanelModule} from '../master-panel/master-panel.module';
import {ActiveStoryModule} from '../active-story/active-story.module';
import {StoryListModule} from '../story-list/story-list.module';
import {ViewMasterComponent} from './view-master.component';

@NgModule({
  imports: [StoryListModule, MasterPanelModule, ActiveStoryModule],
  declarations: [ViewMasterComponent],
  exports: [ViewMasterComponent]
})
export class ViewMasterModule {
}
