import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alertas } from '@data/constants';
import { API_ROUTES, IMAGES_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
declare var $: any;

@Component({
  selector: 'app-edit-cuenta',
  templateUrl: './edit-cuenta.component.html',
  styleUrls: ['./edit-cuenta.component.scss']
})
export class EditCuentaComponent implements OnInit {

  public user_id!: any;
  public userSubmitted!: boolean;
  public userForm!: FormGroup;
  public PhotoFilePath!: String;
  public archivos!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {
    this.userSubmitted = false;
    this.archivos = [];
    this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    this.userForm = this.formBuilder.group({
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
          //Validators.required,
          Validators.maxLength(200)
        ]
      ],
      work: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      direccion: [
        '', 
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      telefono: [
        '', 
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ],
      empresa: [
        '', 
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      descripcion: [
        '', 
        [
          Validators.required,
          Validators.maxLength(300)
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
    this.userForm.get('first_name').setValue(this.authService.getUser.first_name);
    this.userForm.get('last_name').setValue(this.authService.getUser.last_name);
    this.userForm.get('avatar').setValue(this.authService.getUser.avatar);
    this.userForm.get('work').setValue(this.authService.getUser.work);
    this.userForm.get('direccion').setValue(this.authService.getUser.direccion);
    this.userForm.get('telefono').setValue(this.authService.getUser.telefono);
    this.userForm.get('empresa').setValue(this.authService.getUser.empresa);
    this.userForm.get('descripcion').setValue(this.authService.getUser.descripcion);
    
    if(this.authService.getUser.avatar == '' || this.authService.getUser.avatar == null ){
      this.PhotoFilePath=IMAGES_ROUTES.USER_CONTENT;
    }else{
      this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.authService.getUser.avatar;
    }
  }

  updateUser(){
    this.userSubmitted = true;
    if (!this.userForm.valid)
    {
      Alertas.mostrarAlert('Oops...','Por favor, complete todos los campos o verifique los errores del formulario', 'error');
      return;
    }
    const formData = new FormData();
    if(this.archivos.length>0){
      this.archivos.forEach((archivo:any) => {
        formData.append('avatar', archivo)
      })
    }
    formData.append('first_name', this.userForm.get('first_name').value);
    formData.append('last_name', this.userForm.get('last_name').value);
    formData.append('work', this.userForm.get('work').value);
    formData.append('direccion', this.userForm.get('direccion').value);
    formData.append('telefono', this.userForm.get('telefono').value);
    formData.append('empresa', this.userForm.get('empresa').value);
    formData.append('descripcion', this.userForm.get('descripcion').value);

    this.authService.updateUser(formData, this.user_id).subscribe(res=>{
      if(!res.error){
        Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, 'Perfil actualizado correctamente.','success');
        //window.location.reload();
        this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MI_CUENTA);
        $("html, body").animate({ scrollTop: 0 }, 100);
      }else{
        Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, '¡Error al actualizar el perfil, intentalo de nuevo!','error');
      }
    });
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.extraerBase64(file).then((imagen: any) => {
        this.PhotoFilePath = imagen.base;
      })
      this.archivos.push(file);
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

  abrirInputImg(){
    const imgUpload = document.getElementById('imgUploadUser') as HTMLInputElement;
    imgUpload.click();
  }

  eliminarTexto(campo: string){
    this.userForm.get(campo).setValue('');
  }

  regresar(){
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MI_CUENTA);
  }
  
}
