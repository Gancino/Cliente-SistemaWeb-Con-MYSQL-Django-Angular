import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';

const routes: Routes = [
  {
    path: '',
    component: HomeCarouselComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
