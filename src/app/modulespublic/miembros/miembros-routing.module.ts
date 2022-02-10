import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiembrosDetailComponent } from './miembros-detail/miembros-detail.component';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';

const routes: Routes = [
  {
    path: '',
    component: MiembrosListComponent,
  },
  {
    path: ':id',
    component: MiembrosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiembrosRoutingModule { }