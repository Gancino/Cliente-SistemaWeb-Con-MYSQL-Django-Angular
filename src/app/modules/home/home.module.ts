import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeCarouselComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
