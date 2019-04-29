import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ViewDeveloperComponent} from './view-developer.component';

const routes: Route[] = [
  {path: 'view-developer/:sessionId', component: ViewDeveloperComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewDeveloperRoutingModule {
}
