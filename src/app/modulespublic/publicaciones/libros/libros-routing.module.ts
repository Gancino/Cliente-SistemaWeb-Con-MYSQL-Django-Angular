import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosDetailComponent } from './libros-detail/libros-detail.component';
import { LibrosListComponent } from './libros-list/libros-list.component';

const routes: Routes = [
  {
    path: '',
    component: LibrosListComponent,
  },
  {
    path: ':id',
    component: LibrosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }