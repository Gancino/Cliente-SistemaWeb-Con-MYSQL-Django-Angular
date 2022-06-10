import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIntelectualesListComponent } from './p-intelectuales-list/p-intelectuales-list.component';
import { PIntelectualesDetailComponent } from './p-intelectuales-detail/p-intelectuales-detail.component';
import { SharedModule } from '@shared/shared.module';
import { PIntelectualesRoutingModule } from './p-intelectuales-routing.module';

@NgModule({
  declarations: [
    PIntelectualesListComponent,
    PIntelectualesDetailComponent
  ],
  imports: [
    SharedModule,
    PIntelectualesRoutingModule
  ]
})
export class PIntelectualesModule { }
