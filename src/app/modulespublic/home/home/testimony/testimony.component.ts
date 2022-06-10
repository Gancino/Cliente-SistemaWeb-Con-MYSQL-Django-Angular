import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit, OnDestroy {

  public testimony!:any[];
  public value!: number;
  public counter!: any;
  public counterSubscription!: Subscription;
  public tiempo!: number;

  constructor(){
    this.tiempo = 8000;
  }

  ngOnInit(): void {
    this.testimony = [document.querySelectorAll('.testimony__body')];
    this.counter = interval(this.tiempo);
    this.counterSubscription = this.counter.subscribe(() => {
      this.setNext();
    });
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }

  clickNext(){
    this.counterSubscription.unsubscribe();
    this.setNext();
    this.counterSubscription = this.counter.subscribe(() => {
      this.setNext();
    });
  }

  setNext(){
    this.changePosition(1);
  }

  clickBefore(){
    this.counterSubscription.unsubscribe();
    this.setBefore();
    this.counterSubscription = this.counter.subscribe(() => {
      this.setBefore();
    });
  }

  setBefore(){
    this.changePosition(-1);
  }

  changePosition(add: number){
    const currentTestimony = document.querySelector('.testimony__body--show');
    let numero: string = currentTestimony.attributes[1].value;
    this.value = parseInt(numero);
    this.value+=add;
    this.testimony[0][parseInt(numero)-1].classList.remove('testimony__body--show');
    if(this.value === this.testimony[0].length+1 || this.value===0){
      this.value = this.value === 0 ? this.testimony[0].length : 1;
    }
    this.testimony[0][this.value-1].classList.add('testimony__body--show');
  }

}
