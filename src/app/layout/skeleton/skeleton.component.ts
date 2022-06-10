import { AfterViewInit, Component } from '@angular/core';
import { CONST_LEFT_NAV_PAGE } from '@data/constants';
import { IMAGES_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements AfterViewInit{
  
  public menu!: boolean;
  public $theme!: 'blue-dark' | 'dark' | 'red' | 'yellow';
  public loader!: string;
  public isLoader!: boolean;
  public idAppLeftNav!: string;

  constructor() { 
    this.menu = false;
    this.$theme = 'blue-dark';
    this.loader = IMAGES_ROUTES.LOADER;
    this.isLoader = true;
    this.idAppLeftNav = CONST_LEFT_NAV_PAGE.IDLEFTNAV;
  }

  //Una ves que todos los componentes se cargen y la vista este lista o completa se ejecuta este metodo
  ngAfterViewInit(): void {
    //setTimeout() permite controlar el tiempo , tipo pause
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

  showMenu() {
    this.menu =! this.menu;
  }

  getTheme(): string{
    return this.$theme;
  }

  setTheme(theme: any){
    this.$theme = theme;
  }

  clearTheme(){
    this.$theme = 'blue-dark'
  }

  setIsLoader(isloader: boolean){
    this.isLoader = isloader;
  }
}
