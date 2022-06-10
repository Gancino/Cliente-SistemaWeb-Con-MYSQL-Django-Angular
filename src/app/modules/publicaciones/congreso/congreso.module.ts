import { NgModule } from '@angular/core';
import { CongresoComponent } from './congreso/congreso.component';
import { ShowConComponent } from './congreso/show-con/show-con.component';
import { AddEditConComponent } from './congreso/add-edit-con/add-edit-con.component';
import { SharedModule } from '@shared/shared.module';
import { CongresoRoutingModule } from './congreso-routing.module';

@NgModule({
  declarations: [
    CongresoComponent,
    ShowConComponent,
    AddEditConComponent
  ],
  imports: [
    SharedModule,
    CongresoRoutingModule
  ]
})
export class CongresoModule { }
