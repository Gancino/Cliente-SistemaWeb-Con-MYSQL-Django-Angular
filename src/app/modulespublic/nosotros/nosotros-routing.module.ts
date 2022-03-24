import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosDetailComponent } from './nosotros-detail/nosotros-detail.component';
import { NosotrosListComponent } from './nosotros-list/nosotros-list.component';

const routes: Routes = [
  {
    path: '',
    component: NosotrosListComponent,
  },
  {
    path: ':id',
    component: NosotrosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NosotrosRoutingModule { }