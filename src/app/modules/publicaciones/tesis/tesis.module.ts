import { NgModule } from '@angular/core';
import { TesisComponent } from './tesis/tesis.component';
import { ShowTesComponent } from './tesis/show-tes/show-tes.component';
import { AddEditTesComponent } from './tesis/add-edit-tes/add-edit-tes.component';
import { SharedModule } from '@shared/shared.module';
import { TesisRoutingModule } from './tesis-routing.module';

@NgModule({
  declarations: [
    TesisComponent,
    ShowTesComponent,
    AddEditTesComponent
  ],
  imports: [
    SharedModule,
    TesisRoutingModule
  ]
})
export class TesisModule { }
