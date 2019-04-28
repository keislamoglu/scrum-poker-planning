import {NgModule} from '@angular/core';
import {MasterPanelComponent} from './master-panel.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MasterPanelComponent],
  exports: [MasterPanelComponent]
})
export class MasterPanelModule {
}
