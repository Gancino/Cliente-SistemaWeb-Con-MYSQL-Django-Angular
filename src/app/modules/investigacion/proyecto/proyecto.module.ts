import { NgModule } from '@angular/core';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ShowProComponent } from './proyecto/show-pro/show-pro.component';
import { AddEditProComponent } from './proyecto/add-edit-pro/add-edit-pro.component';
import { SharedModule } from '@shared/shared.module';
import { ProyectoRoutingModule } from './proyecto-routing.module';

@NgModule({
  declarations: [
    ProyectoComponent,
    ShowProComponent,
    AddEditProComponent
  ],
  imports: [
    SharedModule,
    ProyectoRoutingModule
  ]
})
export class ProyectoModule { }
