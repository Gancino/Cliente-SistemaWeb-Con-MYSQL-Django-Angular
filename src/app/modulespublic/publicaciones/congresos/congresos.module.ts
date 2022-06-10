import { NgModule } from '@angular/core';
import { CongresosListComponent } from './congresos-list/congresos-list.component';
import { CongresosDetailComponent } from './congresos-detail/congresos-detail.component';
import { SharedModule } from '@shared/shared.module';
import { CongresosRoutingModule } from './congresos-routing.module';

@NgModule({
  declarations: [
    CongresosListComponent,
    CongresosDetailComponent
  ],
  imports: [
    SharedModule,
    CongresosRoutingModule
  ]
})
export class CongresosModule { }
