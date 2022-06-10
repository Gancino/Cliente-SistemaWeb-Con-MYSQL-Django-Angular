import { NgModule } from '@angular/core';
import { LibrosListComponent } from './libros-list/libros-list.component';
import { LibrosDetailComponent } from './libros-detail/libros-detail.component';
import { SharedModule } from '@shared/shared.module';
import { LibrosRoutingModule } from './libros-routing.module';

@NgModule({
  declarations: [
    LibrosListComponent,
    LibrosDetailComponent
  ],
  imports: [
    SharedModule,
    LibrosRoutingModule
  ]
})
export class LibrosModule { }
