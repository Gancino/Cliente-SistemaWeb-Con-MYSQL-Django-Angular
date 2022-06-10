import { Component, OnInit } from '@angular/core';
import { IApiCarousel } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';

@Component({
  selector: 'app-carousel-images',
  templateUrl: './carousel-images.component.html',
  styleUrls: ['./carousel-images.component.scss']
})
export class CarouselImagesComponent implements OnInit {

  public carouselData!: IApiCarousel[];

  constructor(
    private service: PublicService
  ) { }

  ngOnInit(): void {
    this.getCarouselData();
  }

  getCarouselData(){
    this.service.getAllCarousel()
      .subscribe(r => this.carouselData = (r.error) ? [] : r.data);
  }

}
