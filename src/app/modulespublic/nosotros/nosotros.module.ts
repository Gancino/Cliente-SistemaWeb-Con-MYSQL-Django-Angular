import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NosotrosListComponent } from './nosotros-list/nosotros-list.component';
import { NosotrosDetailComponent } from './nosotros-detail/nosotros-detail.component';
import { NosotrosRoutingModule } from './nosotros-routing.module';



@NgModule({
  declarations: [
    NosotrosListComponent,
    NosotrosDetailComponent
  ],
  imports: [
    SharedModule,
    NosotrosRoutingModule
  ]
})
export class NosotrosModule { }
