import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { ShowCatComponent } from './categoria/show-cat/show-cat.component';
import { AddEditCatComponent } from './categoria/add-edit-cat/add-edit-cat.component';
import { CategoriaRoutingModule } from './categoria-routing.module';

@NgModule({
  declarations: [
    CategoriaComponent,
    ShowCatComponent,
    AddEditCatComponent
  ],
  imports: [
    SharedModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
