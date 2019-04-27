import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddStoryListModule} from './components/+add-story-list/add-story-list.module';
import {ViewDeveloperModule} from './components/+view-developer/view-developer.module';
import {ViewMasterModule} from './components/+view-master/view-master.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AddStoryListModule,
    ViewDeveloperModule,
    ViewMasterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
