import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosDetailComponent } from './proyectos-detail/proyectos-detail.component';
import { ProyectosListComponent } from './proyectos-list/proyectos-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectosListComponent,
  },
  {
    path: ':id',
    component: ProyectosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }