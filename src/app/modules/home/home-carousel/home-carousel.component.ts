import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '@data/constants/carousel.const';
import { ICarouselItem } from '@shared/components/carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  public carouselData: ICarouselItem[];

  constructor() { 
    this.carouselData = CAROUSEL_DATA_ITEMS;
  }

  ngOnInit(): void {
  }

}
