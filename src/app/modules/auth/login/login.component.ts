import { Component } from '@angular/core';
import { CONST_LOGIN_PAGE } from '@data/constants';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { INTERNAL_ROUTES } from '@data/constants/routes';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public data: any;
  
  constructor(){
    this.data = CONST_LOGIN_PAGE;
  }
  
}

/*
  ngOnInit(): void {
    this.showMessage();
  }

  showMessage(){
    this.authService.getMessage().subscribe(dat=>{
      this.msg = dat;
      //console.log(this.msg);
    });
  }
  */
