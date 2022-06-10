import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, AfterViewInit {

  public questions!:any[];

  constructor() { }

  ngOnInit(): void {
    this.questions = [document.querySelectorAll('.questions__title')];
  }

  ngAfterViewInit(): void {
    this.questions[0].forEach((element:any) => {
      element.addEventListener('click', () => {
        let answer = element.nextElementSibling;
        let addPadding = element.parentElement.parentElement;
        addPadding.classList.toggle('questions__padding--add');
        element.children[0].classList.toggle('questions__arrow--rotate');
        $(answer).slideToggle();
      });
    });
  }

}
