import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongresosDetailComponent } from './congresos-detail/congresos-detail.component';
import { CongresosListComponent } from './congresos-list/congresos-list.component';

const routes: Routes = [
  {
    path: '',
    component: CongresosListComponent,
  },
  {
    path: ':id',
    component: CongresosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongresosRoutingModule { }