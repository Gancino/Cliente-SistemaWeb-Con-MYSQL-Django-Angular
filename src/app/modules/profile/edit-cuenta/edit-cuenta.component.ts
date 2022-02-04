import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-edit-cuenta',
  templateUrl: './edit-cuenta.component.html',
  styleUrls: ['./edit-cuenta.component.scss']
})
export class EditCuentaComponent implements OnInit {

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
    this.password="";
    this.first_name=this.authService.getUser.first_name;
    this.last_name=this.authService.getUser.last_name;
    this.avatar=this.authService.getUser.avatar;
    this.work=this.authService.getUser.work;
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.authService.getUser.avatar;
  }

  updateUser(){
    var val = {
                username:this.username,
                first_name:this.first_name,
                last_name:this.last_name,
                email:this.email,
                password:this.password,
                avatar:this.avatar,
                work:this.work};
    this.authService.updateUser(val, this.user_id).subscribe(res=>{
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
      this.avatar=data.toString();
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.avatar;
    });
  }
}
