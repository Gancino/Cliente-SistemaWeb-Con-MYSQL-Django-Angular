import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroComponent } from './miembro/miembro.component';
import { ShowMieComponent } from './miembro/show-mie/show-mie.component';
import { AddEditMieComponent } from './miembro/add-edit-mie/add-edit-mie.component';
import { SharedModule } from '@shared/shared.module';
import { MiembroRoutingModule } from './miembro-routing.module';



@NgModule({
  declarations: [
    MiembroComponent,
    ShowMieComponent,
    AddEditMieComponent
  ],
  imports: [
    SharedModule,
    MiembroRoutingModule
  ]
})
export class MiembroModule { }
