import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AddStoryListComponent} from './add-story-list.component';

const routes: Route[] = [
  {path: 'add-story-list', component: AddStoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AddStoryListRoutingModule {
}
