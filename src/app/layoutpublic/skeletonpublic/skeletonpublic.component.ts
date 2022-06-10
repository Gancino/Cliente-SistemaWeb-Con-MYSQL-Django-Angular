import { AfterViewInit, Component } from '@angular/core';
import { IMAGES_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-skeletonpublic',
  templateUrl: './skeletonpublic.component.html',
  styleUrls: ['./skeletonpublic.component.scss']
})
export class SkeletonpublicComponent implements AfterViewInit {

  public loader!: string;
  public isLoader!: boolean;

  constructor() { 
    this.loader = IMAGES_ROUTES.LOADER;
    this.isLoader = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

}
