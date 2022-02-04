import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  ModalTitle!: string;
  ActivateEditUserComp:boolean=false;

  user_id:any;
  username!:string;
  email!:string;
  password!:string;
  first_name!:string;
  last_name!:string;
  avatar!:string;
  work!:string;
  PhotoFilePath!: String;

  constructor(public authService : AuthService) {
  }
  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    this.user_id=this.authService.getUser.user_id;
    this.username=this.authService.getUser.username;
    this.email=this.authService.getUser.email;
    this.password=this.authService.getUser.password;
    this.first_name=this.authService.getUser.first_name;
    this.last_name=this.authService.getUser.last_name;
    this.avatar=this.authService.getUser.avatar;
    this.work=this.authService.getUser.work;
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.authService.getUser.avatar;
  }
  
  closeClick(){
    this.ActivateEditUserComp=false;
    this.loadUser();
  }

  editClick(){
    this.ModalTitle="Editar Cuenta";
    this.ActivateEditUserComp=true;
  }

}
