import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NoticiasListComponent } from './noticias-list/noticias-list.component';
import { NoticiasDetailComponent } from './noticias-detail/noticias-detail.component';
import { NoticiasRoutingModule } from './noticias-routing.module';

@NgModule({
  declarations: [
    NoticiasListComponent,
    NoticiasDetailComponent
  ],
  imports: [
    SharedModule,
    NoticiasRoutingModule
  ]
})
export class NoticiasModule { }
