import { NgModule } from '@angular/core';
import { ArticuloComponent } from './articulo/articulo.component';
import { ShowArtComponent } from './articulo/show-art/show-art.component';
import { AddEditArtComponent } from './articulo/add-edit-art/add-edit-art.component';
import { SharedModule } from '@shared/shared.module';
import { ArticuloRoutingModule } from './articulo-routing.module';

@NgModule({
  declarations: [
    ArticuloComponent,
    ShowArtComponent,
    AddEditArtComponent
  ],
  imports: [
    SharedModule,
    ArticuloRoutingModule
  ]
})
export class ArticuloModule { }
