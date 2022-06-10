import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PIntelectualesDetailComponent } from './p-intelectuales-detail/p-intelectuales-detail.component';
import { PIntelectualesListComponent } from './p-intelectuales-list/p-intelectuales-list.component';

const routes: Routes = [
  {
    path: '',
    component: PIntelectualesListComponent,
  },
  {
    path: ':id',
    component: PIntelectualesDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PIntelectualesRoutingModule { }