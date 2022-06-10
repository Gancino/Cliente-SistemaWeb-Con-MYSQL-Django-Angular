import { NgModule } from '@angular/core';
import { ArticulosListComponent } from './articulos-list/articulos-list.component';
import { ArticulosDetailComponent } from './articulos-detail/articulos-detail.component';
import { SharedModule } from '@shared/shared.module';
import { ArticulosRoutingModule } from './articulos-routing.module';

@NgModule({
  declarations: [
    ArticulosListComponent,
    ArticulosDetailComponent
  ],
  imports: [
    SharedModule,
    ArticulosRoutingModule
  ]
})
export class ArticulosModule { }
