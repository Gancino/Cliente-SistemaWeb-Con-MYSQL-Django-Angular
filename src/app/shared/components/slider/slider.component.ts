import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { IApiCarousel } from '@data/interfaces';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit , OnDestroy {

  /**
   * Custom Properties
   */

  @Input() height!: number;
  @Input() isFullScreen!: boolean;
  @Input() items!: IApiCarousel[];
  /**
   * Final Properties
   */

  public finalHeight!: string | number;
  public currentPosition!: number;
  public counter!: any;
  public counterSubscription!: Subscription;
  public tiempo!: number;
  public pathMedia!: string;

  constructor() {
    this.height = 500;
    this.isFullScreen = false;
    this.items = [];
    this.finalHeight = 0;
    this.currentPosition = 0;
    this.tiempo = 5000;
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
    this.pathMedia = API_ROUTES.MEDIA.DEFAULT;
  }

  ngOnInit(){
    this.items.map( (i, index) => {
      i.id_car = index;
      i.marginLeft = 0;
    });
    //this.counter = setInterval(() => this.setNext(), this.tiempo);
    this.counter = interval(this.tiempo);
    this.counterSubscription = this.counter.subscribe(() => {
      this.setNext();
    });
  }
  
  ngOnDestroy(): void {
    //clearInterval(this.counter);
    this.counterSubscription.unsubscribe();
  }

  clickCurrentPosition(position: number){
    this.counterSubscription.unsubscribe();
    this.setCurrentPosition(position);
    this.counterSubscription = this.counter.subscribe(() => {
      this.setNext();
    });
  }

  setCurrentPosition(position: number){
    //clearInterval(this.counter);
    //this.counter = setInterval(() => this.setNext(), this.tiempo);

    this.currentPosition = position;
    this.items.find( i => i.id_car === 0).marginLeft = -100 * position;
  }

  clickNext(){
    this.counterSubscription.unsubscribe();
    this.setNext();
    this.counterSubscription = this.counter.subscribe(() => {
      this.setNext();
    });
  }

  setNext(){
    //clearInterval(this.counter);
		//this.counter = setInterval(() => this.setNext(), this.tiempo);
    let finalPorcentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length-1){
      finalPorcentage = -100 * nextPosition;
    }else{
      nextPosition = 0;
    }
    this.items.find(i => i.id_car === 0).marginLeft = finalPorcentage;
    this.currentPosition = nextPosition;
  }

  clickBack(){
    this.counterSubscription.unsubscribe();
    this.setBack();
    this.counterSubscription = this.counter.subscribe(() => {
      this.setBack();
    });
  }

  setBack(){
    //clearInterval(this.counter);
		//this.counter = setInterval(() => this.setBack(), this.tiempo);
    let finalPorcentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0){
      finalPorcentage = -100 * backPosition;
    }else{
      backPosition = this.items.length - 1;
      finalPorcentage = -100 * backPosition;
    }
    this.items.find(i => i.id_car === 0).marginLeft = finalPorcentage;
    this.currentPosition = backPosition;
  }
  /*
  pause(){
    clearInterval(this.counter);
  }
  */
}
