import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { EditCuentaComponent } from './edit-cuenta/edit-cuenta.component';

@NgModule({
  declarations: [
    CuentaComponent,
    EditCuentaComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
