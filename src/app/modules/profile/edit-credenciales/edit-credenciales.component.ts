import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-edit-credenciales',
  templateUrl: './edit-credenciales.component.html',
  styleUrls: ['./edit-credenciales.component.scss']
})
export class EditCredencialesComponent implements OnInit {

  user_id:any;
  public loading: boolean;
  public userSubmitted;
  public userForm: FormGroup;
  public emailExist: boolean;
  public emailExistValue: string;
  public colorEmailInput: string;
  public usernameExist: boolean;
  public usernameExistValue: string;
  public colorUsernameInput: string;
  public typePassword: string;
  public clickPassword: boolean;
  public typeConfirmPassword: string;
  public clickConfirmPassword: boolean;
  public colorConfirmPassword: string;
  public errorConfirmPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public authService : AuthService
  ) {
    this.loading = false;
    this.colorEmailInput = 'primary';
    this.emailExist = false;
    this.emailExistValue = '';
    this.colorUsernameInput = 'primary';
    this.usernameExist = false;
    this.usernameExistValue = '';
    this.userSubmitted = false;
    this.typePassword='password';
    this.clickPassword=true;
    this.typeConfirmPassword='password';
    this.clickConfirmPassword=true;
    this.colorConfirmPassword='primary';
    this.errorConfirmPassword=false;
    this.userForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      email: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.maxLength(100)
        ]
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.maxLength(128)
        ]
      ],
      confirmpassword: [
        '', 
        [
          Validators.required,
          Validators.maxLength(128)
        ]
      ]
    });
  }

  get u(){
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    this.user_id=this.authService.getUser.user_id;
    this.userForm.get('username').setValue(this.authService.getUser.username);
    this.userForm.get('email').setValue(this.authService.getUser.email);
    this.userForm.get('password').setValue("");
  }

  updateUser(){
    this.userSubmitted = true;
    if (!this.userForm.valid)
    {
      Alertas.mostrarAlert('Oops...','Por favor, complete todos los campos o verifique los errores del formulario', 'error');
      this.colorConfirmPassword='warn';
      return;
    }

    let password=this.userForm.get('password').value;
    let confirmpassword=this.userForm.get('confirmpassword').value;
    if(password!==confirmpassword){
      Alertas.mostrarAlert('Oops...','Las contraseñas no coinciden', 'error');
      this.errorConfirmPassword=true;
      return;
    }

    this.loading=true;
    const formData = new FormData();

    formData.append('username', this.userForm.get('username').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('password', this.userForm.get('password').value);

    this.authService.updateUserCredentials(formData, this.user_id).subscribe(res=>{
      setTimeout(() => {
        this.loading=false;
        if(!res.error){
          Alertas.mostrarAlert('Buen trabajo!','Crendenciales de acceso actualizadas correctamente.','success');
        }else{
          Alertas.mostrarAlert('Error!','¡Error al actualizar las credenciales de acceso, intentalo de nuevo!','error');
          if(res.msg.username)
          {
            this.usernameExist = true;
            this.usernameExistValue = this.userForm.get('username').value.toString().trim().toLowerCase();
            this.colorUsernameInput = 'warn';
          }
          if(res.msg.email)
          {
            this.emailExist = true;
            this.emailExistValue = this.userForm.get('email').value.toString().trim().toLowerCase();
            this.colorEmailInput = 'warn';
          }
        }
      }, 500);
    });
  }

  existEmail(){
    this.emailExist=false;
    if(this.emailExistValue !== ''){
      let emailForm = this.userForm.get('email').value.toString().trim().toLowerCase();
      if( emailForm === this.emailExistValue ){
        this.emailExist = true;
        this.colorEmailInput = 'warn';
      }
      else{
        this.emailExist = false;
        this.colorEmailInput = 'primary';
      }
    }
  }

  existUsername(){
    this.usernameExist=false;
    if(this.usernameExistValue !== ''){
      let usernameForm = this.userForm.get('username').value.toString().trim().toLowerCase();
      if( usernameForm === this.usernameExistValue ){
        this.usernameExist = true;
        this.colorUsernameInput = 'warn';
      }
      else{
        this.usernameExist = false;
        this.colorUsernameInput = 'primary';
      }
    }
  }

  eliminarTexto(campo: string){
    this.userForm.get(campo).setValue('');
  }

  metodotypePassword(cond:string){
    if(cond==='1'){
      this.typePassword='text';
      this.clickPassword=false;
    }else{
      this.typePassword='password';
      this.clickPassword=true;
    }
  }

  metodotypeConfirmPassword(cond:string){
    if(cond==='1'){
      this.typeConfirmPassword='text';
      this.clickConfirmPassword=false;
    }else{
      this.typeConfirmPassword='password';
      this.clickConfirmPassword=true;
    }
  }

  notConfirmPassword(){
    let password=this.userForm.get('password').value
    if(password.length>0){
      let confirmpassword=this.userForm.get('confirmpassword').value;
      if( confirmpassword !== password ){
        this.errorConfirmPassword = true;
        this.colorConfirmPassword = 'warn';
      }
      else{
        this.errorConfirmPassword = false;
        this.colorConfirmPassword = 'primary';
      }
    }
  }
}