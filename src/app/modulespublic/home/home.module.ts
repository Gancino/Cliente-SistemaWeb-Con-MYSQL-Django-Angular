import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselImagesComponent } from './carousel-images/carousel-images.component';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    CarouselImagesComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
