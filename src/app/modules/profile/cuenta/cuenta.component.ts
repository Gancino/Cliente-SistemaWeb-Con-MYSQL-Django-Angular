import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { PrivateService } from '@data/services/api/private.service';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit{

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

  ThemeList: any=[];
  public themeForm: FormGroup;
  public cont: number = 0;

  constructor(
    public authService : AuthService, 
    private skeleton:SkeletonComponent,
    private service: PrivateService,
    private formBuilder: FormBuilder,
  ) {
    this.themeForm = this.formBuilder.group({
      id_th:[
        ''
      ],
      nombre_th: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      posicion_th: [
        '', 
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.loadUser()
    this.refreshTheme()
  }

  refreshTheme(){
    this.service.getThemeList().subscribe(data => {
      this.ThemeList=data;
      if(this.ThemeList.length > 0){
        for(let i = 0 ; i < 1 ; i++){
          this.skeleton.setTheme(this.ThemeList[i].nombre_th)
          this.cont=+this.ThemeList[i].posicion_th
        }
      }
    });
  }

  cambiarTheme(){
    const themes: any = [['blue-dark',0], ['dark',1],['red',2], ['yellow',3]]
    if(this.ThemeList.length > 0){
      for(let i = 0 ; i < 1 ; i++){
        this.cont=+this.ThemeList[i].posicion_th;
      }
      this.cont=this.cont+1
      if(this.cont>3)
      {
        this.cont=0;
      }
      //console.log("Editar")
      for(let i = 0 ; i < 1 ; i++){
        this.themeForm.get('id_th').setValue(this.ThemeList[i].id_th)
      }
      this.themeForm.get('nombre_th').setValue(themes[this.cont][0])
      this.themeForm.get('posicion_th').setValue(themes[this.cont][1])
      this.service.updateTheme(this.themeForm.value).subscribe( r =>{
        this.refreshTheme()
      });
    }
    else{
      //console.log("Agregar")
      this.themeForm.get('nombre_th').setValue(themes[this.cont+1][0])
      this.themeForm.get('posicion_th').setValue(themes[this.cont+1][1])
      this.service.addTheme(this.themeForm.value).subscribe( r =>{
        this.refreshTheme()
      });
    }
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
    this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.authService.getUser.avatar;
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
