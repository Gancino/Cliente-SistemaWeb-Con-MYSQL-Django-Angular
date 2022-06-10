import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosDetailComponent } from './articulos-detail/articulos-detail.component';
import { ArticulosListComponent } from './articulos-list/articulos-list.component';

const routes: Routes = [
  {
    path: '',
    component: ArticulosListComponent,
  },
  {
    path: ':id',
    component: ArticulosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }