import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CuentaComponent } from './cuenta/cuenta.component';
import { EditCuentaComponent } from './edit-cuenta/edit-cuenta.component';

const routes: Routes = [
  {
    path: '',
    component: CuentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update',
    component: EditCuentaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }