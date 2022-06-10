import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { PIntelectualComponent } from './p-intelectual/p-intelectual.component';

const routes: Routes = [
  {
    path: '',
    component: PIntelectualComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PIntelectualRoutingModule { }