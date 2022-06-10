import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Alertas } from '@data/constants';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { API_ROUTES, IMAGES_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { PrivateService } from '@data/services/api/private.service';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit{

  public ModalTitle!: string;
  public EditCredentUserComp!: boolean;

  public user_id:any;
  public username!:string;
  public email!:string;
  public password!:string;
  public first_name!:string;
  public last_name!:string;
  public avatar!:string;
  public work!:string;
  public direccion!:string;
  public telefono!:string;
  public empresa!:string;
  public descripcion!:string;
  public PhotoFilePath!: String;

  public ThemeList!: any[];
  public themeForm!: FormGroup;
  public cont!: number;
  public routeUpdate!: string;
  public hrefFacebook!: string;
  public hrefTwitter!: string;

  constructor(
    private authService : AuthService, 
    private modal : NgbModal,
    private _snackBar: MatSnackBar,
    private skeleton:SkeletonComponent,
    private service: PrivateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.EditCredentUserComp = false;
    this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    this.ThemeList = [];
    this.cont = 0;
    this.routeUpdate = INTERNAL_ROUTES.PANEL_UPDATE_CUENTA;
    this.hrefFacebook = CONST_GLOBAL.FACEBOOK;
    this.hrefTwitter = CONST_GLOBAL.TWITTER;
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
      ],
      fk_id_usu: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.loadUser()
    this.refreshTheme()
  }

  estructModal(content: any){
    this.modal.open(content,{
      size: 'md',
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  refreshTheme(){
    this.service.getThemeDetail(this.user_id).subscribe(data => {
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
      this.themeForm.get('fk_id_usu').setValue(this.user_id)
      this.service.updateTheme(this.themeForm.value).subscribe( r =>{
        this.refreshTheme()
      });
    }else{
      //console.log("Agregar")
      this.themeForm.get('nombre_th').setValue(themes[this.cont+1][0])
      this.themeForm.get('posicion_th').setValue(themes[this.cont+1][1])
      this.themeForm.get('fk_id_usu').setValue(this.user_id)
      this.service.addTheme(this.themeForm.value).subscribe( r =>{
        this.refreshTheme()
      });
    }
    const them: any = ['Azul Oscuro', 'Oscuro','Rojo', 'Amarillo'];
    Alertas.mostrarToast('Tema '+them[this.cont] + ' seleccionado ['+(this.cont+1)+'/4]', this._snackBar);
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
    this.direccion=this.authService.getUser.direccion;
    this.telefono=this.authService.getUser.telefono;
    this.empresa=this.authService.getUser.empresa;
    this.descripcion=this.authService.getUser.descripcion;
    if(this.authService.getUser.avatar == '' || this.authService.getUser.avatar == null ){
      this.PhotoFilePath=IMAGES_ROUTES.USER_CONTENT;
    }else{
      this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.authService.getUser.avatar;
    }
  }
  
  closeClick(){
    this.modal.dismissAll();
    this.EditCredentUserComp = false;
    this.loadUser();
  }

  editClick(contenido: any){
    this.EditCredentUserComp = true;
    this.estructModal(contenido);
    this.ModalTitle="Editar Credenciales de Acceso";
  }

  editProfile(){
    this.router.navigateByUrl(this.routeUpdate);
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

}
