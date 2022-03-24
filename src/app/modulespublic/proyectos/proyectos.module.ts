import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProyectosDetailComponent } from './proyectos-detail/proyectos-detail.component';
import { ProyectosListComponent } from './proyectos-list/proyectos-list.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';

@NgModule({
  declarations: [
    ProyectosListComponent,
    ProyectosDetailComponent
  ],
  imports: [
    SharedModule,
    ProyectosRoutingModule
  ]
})
export class ProyectosModule { }
