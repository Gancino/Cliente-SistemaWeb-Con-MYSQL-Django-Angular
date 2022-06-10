import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselImagesComponent } from './home/carousel-images/carousel-images.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/hero/hero.component';
import { AboutComponent } from './home/about/about.component';
import { InformationComponent } from './home/information/information.component';
import { QuestionsComponent } from './home/questions/questions.component';
import { TestimonyComponent } from './home/testimony/testimony.component';



@NgModule({
  declarations: [
    CarouselImagesComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    InformationComponent,
    QuestionsComponent,
    TestimonyComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
