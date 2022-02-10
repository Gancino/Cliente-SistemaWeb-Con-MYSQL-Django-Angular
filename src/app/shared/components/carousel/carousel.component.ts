import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  /**
   * Custom Properties
   */

  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];
  /**
   * Final Properties
   */

  public finalHeight: string | number = 0;
  public currentPosition = 0;
  public counter: any;
  public tiempo: number = 5000;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit(){
    this.items.map( (i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
    this.counter = setInterval(() => this.setNext(), this.tiempo);
  }
  ngOnDestroy(): void {
    clearInterval(this.counter);
  }

  setCurrentPosition(position: number){
    clearInterval(this.counter);
    this.counter = setInterval(() => this.setNext(), this.tiempo);
    this.currentPosition = position;
    this.items.find( i => i.id === 0).marginLeft = -100 * position;
  }

  setNext(){
    clearInterval(this.counter);
		this.counter = setInterval(() => this.setNext(), this.tiempo);
    let finalPorcentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length-1){
      finalPorcentage = -100 * nextPosition;
    }else{
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPorcentage;
    this.currentPosition = nextPosition;
  }

  setBack(){
    clearInterval(this.counter);
		this.counter = setInterval(() => this.setBack(), this.tiempo);
    let finalPorcentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0){
      finalPorcentage = -100 * backPosition;
    }else{
      backPosition = this.items.length - 1;
      finalPorcentage = -100 * backPosition;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPorcentage;
    this.currentPosition = backPosition;
  }
  /*
  pause(){
    clearInterval(this.counter);
  }
  */
}
