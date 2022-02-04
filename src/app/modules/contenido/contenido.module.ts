import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from './contenido/contenido.component';
import { ShowContComponent } from './contenido/show-cont/show-cont.component';
import { AddEditContComponent } from './contenido/add-edit-cont/add-edit-cont.component';
import { SharedModule } from '@shared/shared.module';
import { ContenidoRoutingModule } from './contenido-routing.module';

@NgModule({
  declarations: [
    ContenidoComponent,
    ShowContComponent,
    AddEditContComponent
  ],
  imports: [
    SharedModule,
    ContenidoRoutingModule
  ]
})
export class ContenidoModule { }
