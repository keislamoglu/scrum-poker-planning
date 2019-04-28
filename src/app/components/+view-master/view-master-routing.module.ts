import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ViewMasterComponent} from './view-master.component';

const routes: Route[] = [
  {path: 'view-master/:sessionId', component: ViewMasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewMasterRoutingModule {
}
