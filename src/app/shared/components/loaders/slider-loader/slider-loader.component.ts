import { Component } from '@angular/core';

@Component({
  selector: 'app-slider-loader',
  templateUrl: './slider-loader.component.html',
  styleUrls: ['./slider-loader.component.scss']
})
export class SliderLoaderComponent {

  //Final properties
  public finalHeight!: string | number;
  public isFullScreen!: boolean;

  constructor() { 
    this.isFullScreen = false;
    this.finalHeight = 0;
    this.finalHeight = this.isFullScreen ? '100vh' : `500px`;
  }
}
