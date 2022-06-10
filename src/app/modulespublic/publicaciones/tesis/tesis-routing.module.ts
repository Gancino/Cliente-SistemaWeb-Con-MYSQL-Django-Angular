import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesisDetailComponent } from './tesis-detail/tesis-detail.component';
import { TesisListComponent } from './tesis-list/tesis-list.component';

const routes: Routes = [
  {
    path: '',
    component: TesisListComponent,
  },
  {
    path: ':id',
    component: TesisDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesisRoutingModule { }