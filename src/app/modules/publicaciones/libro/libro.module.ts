import { NgModule } from '@angular/core';
import { LibroComponent } from './libro/libro.component';
import { ShowLibComponent } from './libro/show-lib/show-lib.component';
import { AddEditLibComponent } from './libro/add-edit-lib/add-edit-lib.component';
import { SharedModule } from '@shared/shared.module';
import { LibroRoutingModule } from './libro-routing.module';

@NgModule({
  declarations: [
    LibroComponent,
    ShowLibComponent,
    AddEditLibComponent
  ],
  imports: [
    SharedModule,
    LibroRoutingModule
  ]
})
export class LibroModule { }
