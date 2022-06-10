import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title-h1',
  templateUrl: './title-h1.component.html',
  styleUrls: ['./title-h1.component.scss']
})
export class TitleH1Component implements OnInit,OnChanges {
  @Input() text!: string;
  @Input() type!: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'dark';

  @Input() pricePesos!: number;
  public priceDollar!: number;
  public priceEuro!: number;

  constructor() { 
    this.text = '';
    this.type = 'primary';
    this.pricePesos = 0;
    this.priceDollar = 0;
    this.priceEuro = 0;
  }
  //ngOnChanges() Se ejecuta antes de que se construya el componente y se puede volver a ejecutar si recibe
  //cambios en una variable con excepcion de los Arrays
  ngOnChanges(c: SimpleChanges): void {
    if(c.pricePesos && c.pricePesos.currentValue){
      this.pricePesos = c.pricePesos.currentValue;
      this.priceDollar = this.pricePesos * this.getCurrentDollarFromApi();
      this.priceEuro = this.pricePesos * this.getCurrentEuroFromApi();
    }
  }
  //El metodo ngOnInit() se ejecuta una ves que el componente se haya construido
  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  getCurrentDollarFromApi(){
    return 22;
  }

  getCurrentEuroFromApi(){
    return 22.5;
  }
}
