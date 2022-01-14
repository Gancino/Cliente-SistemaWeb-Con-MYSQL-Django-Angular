import { Component, OnInit } from '@angular/core';
import { CONST_LOGIN_PAGE } from '@data/constants';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public data;

  msg: any;

  constructor(
    private authService: AuthService
  ){
    this.data = CONST_LOGIN_PAGE;
  }
  ngOnInit(): void {
    this.showMessage();
  }

  showMessage(){
    this.authService.getMessage().subscribe(dat=>{
      this.msg = dat,
      console.log(this.msg);
    });
  }
}
