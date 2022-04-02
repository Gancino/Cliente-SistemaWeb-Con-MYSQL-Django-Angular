import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { API_ROUTES } from '@data/constants/routes';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-mie',
  templateUrl: './add-edit-mie.component.html',
  styleUrls: ['./add-edit-mie.component.scss']
})
export class AddEditMieComponent implements OnInit {

  @Input() miem:any;
  public miembroSubmitted;
  public miembroForm: FormGroup;
  public loading: boolean;
  public correoExist: boolean;
  public correoExistValue: string;
  public colorCorreoInput: string;

  PhotoFilePath!: String;
  MiembroList:any=[];
  public archivos:any=[];
  public estadoImg:string;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) {
    this.colorCorreoInput = 'primary';
    this.correoExist = false;
    this.correoExistValue = '';
    this.loading = false;
    this.estadoImg = 'Subir imágen';
    this.miembroSubmitted = false;
    this.miembroForm = this.formBuilder.group({
      id_miem:[
        ''
      ],
      nombre_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      apellido_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      correo_miem: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.maxLength(100)
        ]
      ],
      telefono_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ],
      imagen_miem: [
        '', 
        [
          Validators.maxLength(300)
        ]
      ],
      cargo_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      descripcion_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ]
    });
  }

  get m(){
    return this.miembroForm.controls;
  }

  ngOnInit(): void {
    this.loadMiembroList();
  }

  loadMiembroList(){
    this.miembroForm.get('id_miem').setValue(this.miem.id_miem);
    this.miembroForm.get('nombre_miem').setValue(this.miem.nombre_miem);
    this.miembroForm.get('apellido_miem').setValue(this.miem.apellido_miem);
    this.miembroForm.get('correo_miem').setValue(this.miem.correo_miem);
    this.miembroForm.get('telefono_miem').setValue(this.miem.telefono_miem);
    this.miembroForm.get('cargo_miem').setValue(this.miem.cargo_miem);
    this.miembroForm.get('descripcion_miem').setValue(this.miem.descripcion_miem);
    if(this.miem.imagen_miem == '' || this.miem.imagen_miem == null ){
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+'anonymous.png';
      this.miembroForm.get('imagen_miem').setValue('');
    }else{
      this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.miem.imagen_miem;
      this.miembroForm.get('imagen_miem').setValue(this.miem.imagen_miem);
    }
  }

  addEditMiembro(){
    this.miembroSubmitted = true;
    if (!this.miembroForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();
    if(this.archivos.length>0){
      this.archivos.forEach((archivo:any) => {
        formData.append('imagen_miem', archivo)
      })
    }
    
    formData.append('nombre_miem', this.miembroForm.get('nombre_miem').value);
    formData.append('apellido_miem', this.miembroForm.get('apellido_miem').value);
    formData.append('correo_miem', this.miembroForm.get('correo_miem').value);
    formData.append('telefono_miem', this.miembroForm.get('telefono_miem').value);
    formData.append('cargo_miem', this.miembroForm.get('cargo_miem').value);
    formData.append('descripcion_miem', this.miembroForm.get('descripcion_miem').value);
 
    if(this.miem.id_miem==0){
      this.service.addMiembro(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro agregado correctamente en el sistema.','success');
            this.miembroForm.reset();
            this.reiniciarForm(['nombre_miem', 'apellido_miem', 'descripcion_miem', 'correo_miem', 'telefono_miem', 'cargo_miem']);
          }else{
            Alertas.mostrarAlert('Error!','¡Error al agregar el registro, intentalo de nuevo!','error');
            this.correoExist = true;
            this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
            this.colorCorreoInput = 'warn';
          }
        }, 500);
        /*
        if(r.error){
          this.correoExist = true;
          this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
        }else{
          this.correoExist = false;
          alert(r.msg.toString());
        }
        */
      });
    }
    else{
      formData.append('id_miem', this.miembroForm.get('id_miem').value);
      this.service.updateMiembro(formData).subscribe( r =>{
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro actualizado correctamente.','success');
          }else{
            Alertas.mostrarAlert('Error!','¡Error al actualizar el registro, intentalo de nuevo!','error');
            this.correoExist = true;
            this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
            this.colorCorreoInput = 'warn';
          }
        }, 500);
        /*
        if(r.error){
          this.correoExist = true;
          this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
        }else{
          this.correoExist = false;
          alert(r.msg.toString());
        }
        */
      });
    }
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.extraerBase64(file).then((imagen: any) => {
        this.PhotoFilePath = imagen.base;
      })
      this.archivos.push(file)
      this.estadoImg=file.name;
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
  })

  existCorreo(){
    this.correoExist=false;
    if(this.correoExistValue !== ''){
      let correoForm = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
      if( correoForm === this.correoExistValue){
        this.correoExist = true;
        this.colorCorreoInput = 'warn';
      }
      else{
        this.correoExist = false;
        this.colorCorreoInput = 'primary';
      }
    }
  }

  abrirInputImg(){
    const imgUpload = document.getElementById('imgUploadMiembro') as HTMLInputElement;
    imgUpload.click();
  }

  reiniciarForm(campo: any[]){
    for (let i=0; i < campo.length; i++){
      this.miembroForm.get(campo[i]).setValue('');  
    } 
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN + 'anonymous.png';
    this.archivos=[];
    this.miembroSubmitted = false;
    this.estadoImg='Subir imágen';
    this.colorCorreoInput = 'primary';
  }

  eliminarTexto(campo: string){
    this.miembroForm.get(campo).setValue('');
  }
  /*
  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadImage(formData).subscribe((data:any)=>{
      this.miembroForm.get('imagen_miem').setValue(data.toString());
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.miembroForm.get('imagen_miem').value;
    });
  }
  */

}