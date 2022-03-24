import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-edit-cuenta',
  templateUrl: './edit-cuenta.component.html',
  styleUrls: ['./edit-cuenta.component.scss']
})
export class EditCuentaComponent implements OnInit {

  user_id:any;
  public userSubmitted;
  public userForm: FormGroup;
  PhotoFilePath!: String;
  public emailExist: boolean;
  public emailExistValue: string;
  public usernameExist: boolean;
  public usernameExistValue: string;

  public archivos:any=[];

  constructor(
    private formBuilder: FormBuilder,
    public authService : AuthService
  ) {
    this.emailExist = false;
    this.emailExistValue = '';
    this.usernameExist = false;
    this.usernameExistValue = '';
    this.userSubmitted = false;
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
      first_name: [
        '', 
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      last_name: [
        '', 
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      avatar: [
        '', 
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      work: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
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
    this.userForm.get('first_name').setValue(this.authService.getUser.first_name);
    this.userForm.get('last_name').setValue(this.authService.getUser.last_name);
    this.userForm.get('avatar').setValue(this.authService.getUser.avatar);
    this.userForm.get('work').setValue(this.authService.getUser.work);
    this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.authService.getUser.avatar;
  }

  updateUser(){

    this.userSubmitted = true;
    if (!this.userForm.valid)
    {
      return;
    }
    const formData = new FormData();
    if(this.archivos.length>0){
      this.archivos.forEach((archivo:any) => {
        formData.append('avatar', archivo)
      })
    }

    formData.append('username', this.userForm.get('username').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('password', this.userForm.get('password').value);
    formData.append('first_name', this.userForm.get('first_name').value);
    formData.append('last_name', this.userForm.get('last_name').value);
    formData.append('work', this.userForm.get('work').value);

    this.authService.updateUser(formData, this.user_id).subscribe(res=>{
      if(!res.error){
        alert(res.msg);
        window.location.reload();
      }
      else{
        if(res.msg.username)
        {
          this.usernameExist = true;
          this.usernameExistValue = this.userForm.get('username').value.toString().trim().toLowerCase();
        }
        if(res.msg.email)
        {
          this.emailExist = true;
          this.emailExistValue = this.userForm.get('email').value.toString().trim().toLowerCase();
        }
      }
    });
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.extraerBase64(file).then((imagen: any) => {
        this.PhotoFilePath = imagen.base;
      })
      this.archivos.push(file)
      
    }
  }

  extraerBase64 = async ( $event: any) => new Promise((resolve, reject) => {
    try{
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  });

  existEmail(){
    this.emailExist=false;
    if(this.emailExistValue !== ''){
      let emailForm = this.userForm.get('email').value.toString().trim().toLowerCase();
      if( emailForm === this.emailExistValue ){
        this.emailExist = true;
      }
      else{
        this.emailExist = false;
      }
    }
  }

  existUsername(){
    this.usernameExist=false;
    if(this.usernameExistValue !== ''){
      let usernameForm = this.userForm.get('username').value.toString().trim().toLowerCase();
      if( usernameForm === this.usernameExistValue ){
        this.usernameExist = true;
      }
      else{
        this.usernameExist = false;
      }
    }
  }
  /*
  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.authService.UploadFile(formData).subscribe((data:any)=>{
      this.userForm.get('avatar').setValue(data.toString());
      this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.userForm.get('avatar').value;
    });
  }
  */
}
