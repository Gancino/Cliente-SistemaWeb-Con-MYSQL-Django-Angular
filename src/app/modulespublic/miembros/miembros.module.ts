import { NgModule } from '@angular/core';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';
import { MiembrosDetailComponent } from './miembros-detail/miembros-detail.component';
import { SharedModule } from '@shared/shared.module';
import { MiembrosRoutingModule } from './miembros-routing.module';

@NgModule({
  declarations: [
    MiembrosListComponent,
    MiembrosDetailComponent
  ],
  imports: [
    SharedModule,
    MiembrosRoutingModule
  ]
})
export class MiembrosModule { }
