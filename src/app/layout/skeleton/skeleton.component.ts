import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements AfterViewInit{

  public showLeftNav = true;
  public $theme: 'blue-dark' | 'dark' | 'red' | 'yellow';
  public loader = 'assets/images/loader/loader.gif';
  public isLoader = true;
  constructor() { 
    this.$theme = 'blue-dark';
  }


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

  getTheme(): string{
    return this.$theme;
  }

  setTheme(theme: any){
    this.$theme = theme;
  }

  clearTheme(){
    this.$theme = 'blue-dark'
  }
}
