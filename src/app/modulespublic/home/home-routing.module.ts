import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselImagesComponent } from './carousel-images/carousel-images.component';

const routes: Routes = [
  {
    path: '',
    component: CarouselImagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }