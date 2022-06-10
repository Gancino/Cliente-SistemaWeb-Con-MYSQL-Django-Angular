import { NgModule } from '@angular/core';
import { TesisListComponent } from './tesis-list/tesis-list.component';
import { TesisDetailComponent } from './tesis-detail/tesis-detail.component';
import { SharedModule } from '@shared/shared.module';
import { TesisRoutingModule } from './tesis-routing.module';

@NgModule({
  declarations: [
    TesisListComponent,
    TesisDetailComponent
  ],
  imports: [
    SharedModule,
    TesisRoutingModule
  ]
})
export class TesisModule { }
