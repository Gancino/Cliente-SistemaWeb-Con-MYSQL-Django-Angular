import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { ShowCarComponent } from './carousel/show-car/show-car.component';
import { AddEditCarComponent } from './carousel/add-edit-car/add-edit-car.component';
import { SharedModule } from '@shared/shared.module';
import { CarouselRoutingModule } from './carousel-routing.module';

@NgModule({
  declarations: [
    CarouselComponent,
    ShowCarComponent,
    AddEditCarComponent
  ],
  imports: [
    SharedModule,
    CarouselRoutingModule
  ]
})
export class CarouselModule { }
