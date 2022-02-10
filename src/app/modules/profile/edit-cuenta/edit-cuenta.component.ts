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

  constructor(
    private formBuilder: FormBuilder,
    public authService : AuthService
  ) {
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
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.authService.getUser.avatar;
  }

  updateUser(){

    this.userSubmitted = true;
    if (!this.userForm.valid)
    {
      return;
    }
    this.authService.updateUser(this.userForm.value, this.user_id).subscribe(res=>{
      alert(res.msg);
      if(!res.error){
        window.location.reload();
      }
    });
  }

  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.authService.UploadFile(formData).subscribe((data:any)=>{
      this.userForm.get('avatar').setValue(data.toString());
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.userForm.get('avatar').value;
    });
  }
}
