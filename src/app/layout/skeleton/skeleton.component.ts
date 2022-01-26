import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements AfterViewInit{

  public showLeftNav = true;
  public $theme: 'dark' | 'red' | 'blue-dark' | 'yellow' = 'blue-dark';
  public loader = 'assets/images/loader/loader.gif';
  public isLoader = true;
  constructor() { }


  //Una ves que todos los componentes se cargen y la vista este lista o completa se ejecuta este metodo
  ngAfterViewInit(): void {
    //setTimeout() permite controlar el tiempo , tipo pause
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

  showMenu() {
    this.showLeftNav = !this.showLeftNav;
  }
}
