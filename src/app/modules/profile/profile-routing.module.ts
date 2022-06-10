import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { INTERNAL_PATHS } from '@data/constants/routes';
import { CuentaComponent } from './cuenta/cuenta.component';
import { EditCuentaComponent } from './edit-cuenta/edit-cuenta.component';

const routes: Routes = [
  {
    path: '',
    component: CuentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: INTERNAL_PATHS.PANEL_UPDATE_CUENTA,
    component: EditCuentaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }