import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasDetailComponent } from './noticias-detail/noticias-detail.component';
import { NoticiasListComponent } from './noticias-list/noticias-list.component';

const routes: Routes = [
  {
    path: '',
    component: NoticiasListComponent,
  },
  {
    path: ':id',
    component: NoticiasDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }