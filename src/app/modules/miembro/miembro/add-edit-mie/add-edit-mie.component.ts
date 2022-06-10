import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { API_ROUTES, IMAGES_ROUTES } from '@data/constants/routes';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-mie',
  templateUrl: './add-edit-mie.component.html',
  styleUrls: ['./add-edit-mie.component.scss']
})
export class AddEditMieComponent implements OnInit {

  @Input() miem:any;
  public miembroSubmitted!: boolean;
  public miembroForm!: FormGroup;
  public loading!: boolean;
  public correoExist!: boolean;
  public correoExistValue!: string;
  public colorCorreoInput!: string;

  public PhotoFilePath!: String;
  public filePath!: string;
  public filePathName!: string;
  public MiembroList!: any[];

  public archivosImg!: any[];
  public archivosFil!: any[];
  public estadoImg!: string;
  public estadoFil!: string;
  public hrefPathFile!: boolean;

  public tipoMiembro!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) {
    this.colorCorreoInput = 'primary';
    this.correoExist = false;
    this.correoExistValue = '';
    this.MiembroList = [];
    this.archivosImg = [];
    this.archivosFil = [];
    this.miembroSubmitted = false;
    this.loading = false;
    this.hrefPathFile = false;
    this.estadoImg = 'Imágen';
    this.estadoFil = 'Hoja de vida';
    this.PhotoFilePath = IMAGES_ROUTES.ANONYMOUS;
    this.tipoMiembro = [
      {
        id: "1",
        tipo: 'Miembro de interés'
      },
      {
        id: "2",
        tipo: 'Colaborador'
      }
    ];
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
      ],
      hvida_miem: [
        '', 
        [
          Validators.maxLength(300)
        ]
      ],
      tipo_miem: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

  get m(){
    return this.miembroForm.controls;
  }

  ngOnInit(): void {
    if(this.miem.id_miem != 0){
      this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    }
    this.loadMiembro();
  }

  loadMiembro(){
    this.miembroForm.get('id_miem').setValue(this.miem.id_miem);
    this.miembroForm.get('nombre_miem').setValue(this.miem.nombre_miem);
    this.miembroForm.get('apellido_miem').setValue(this.miem.apellido_miem);
    this.miembroForm.get('correo_miem').setValue(this.miem.correo_miem);
    this.miembroForm.get('telefono_miem').setValue(this.miem.telefono_miem);
    this.miembroForm.get('cargo_miem').setValue(this.miem.cargo_miem);
    this.miembroForm.get('descripcion_miem').setValue(this.miem.descripcion_miem);
    if(this.miem.hvida_miem !== '' && this.miem.hvida_miem !== null ){
      this.miembroForm.get('hvida_miem').setValue(this.miem.hvida_miem);
      let arr = this.miembroForm.get('hvida_miem').value.split('/');
      this.filePathName=arr[arr.length-1];
      this.hrefPathFile=true;
    }else{
      this.hrefPathFile=false;
      this.miembroForm.get('hvida_miem').setValue('');
    }
    this.miembroForm.get('tipo_miem').setValue(this.miem.tipo_miem);
    setTimeout(() => {
      if(this.miem.imagen_miem == '' || this.miem.imagen_miem == null ){
        this.PhotoFilePath=IMAGES_ROUTES.ANONYMOUS;
        this.miembroForm.get('imagen_miem').setValue('');
      }else{
        this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.miem.imagen_miem;
        this.miembroForm.get('imagen_miem').setValue(this.miem.imagen_miem);
      }
    }, 100);
    this.filePath=API_ROUTES.MEDIA.DEFAULT+this.miem.hvida_miem;
  }

  addEditMiembro(){
    this.miembroSubmitted = true;
    if (!this.miembroForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();
    if(this.archivosImg.length>0){
      this.archivosImg.forEach((imagen:any) => {
        formData.append('imagen_miem', imagen)
      })
    }
    if(this.archivosFil.length>0){
      this.archivosFil.forEach((archivo:any) => {
        formData.append('hvida_miem', archivo)
      })
    }
    
    formData.append('nombre_miem', this.miembroForm.get('nombre_miem').value);
    formData.append('apellido_miem', this.miembroForm.get('apellido_miem').value);
    formData.append('correo_miem', this.miembroForm.get('correo_miem').value);
    formData.append('telefono_miem', this.miembroForm.get('telefono_miem').value);
    formData.append('cargo_miem', this.miembroForm.get('cargo_miem').value);
    formData.append('descripcion_miem', this.miembroForm.get('descripcion_miem').value);
    formData.append('tipo_miem', this.miembroForm.get('tipo_miem').value);
 
    if(this.miem.id_miem==0){
      this.service.addMiembro(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.miembroForm.reset();
            this.reiniciarForm(['nombre_miem', 'apellido_miem', 'descripcion_miem', 'correo_miem', 'telefono_miem', 'cargo_miem', 'tipo_miem']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR,'error');
            this.correoExist = true;
            this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
            this.colorCorreoInput = 'warn';
          }
        }, 500);
      });
    }else{
      formData.append('id_miem', this.miembroForm.get('id_miem').value);
      this.service.updateMiembro(formData).subscribe( r =>{
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_EDIT_SUCCESS, 'success');
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_EDIT_ERROR, 'error');
            this.correoExist = true;
            this.correoExistValue = this.miembroForm.get('correo_miem').value.toString().trim().toLowerCase();
            this.colorCorreoInput = 'warn';
          }
        }, 500);
      });
    }
  }

  onChangeImg(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.extraerBase64(file).then((imagen: any) => {
        this.PhotoFilePath = imagen.base;
      })
      this.archivosImg.push(file)
      this.estadoImg=file.name;
    }
  }

  onChangeFil(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivosFil.push(file)
      this.estadoFil=file.name;
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
      }else{
        this.correoExist = false;
        this.colorCorreoInput = 'primary';
      }
    }
  }

  abrirInputFil(){
    const fileUpload = document.getElementById('fileUploadMiembro') as HTMLInputElement;
    fileUpload.click();
  }
  abrirInputImg(){
    const imgUpload = document.getElementById('imgUploadMiembro') as HTMLInputElement;
    imgUpload.click();
  }
  abrirHrefFile(){
    if(this.miem.hvida_miem != null){
      const hrefPath = document.getElementById('hrefPathFileMiembro') as HTMLInputElement;
      hrefPath.click();
    }
  }

  reiniciarForm(campo: any[]){
    for (let i=0; i < campo.length; i++){
      this.miembroForm.get(campo[i]).setValue('');  
    } 
    this.PhotoFilePath=IMAGES_ROUTES.ANONYMOUS;
    this.archivosImg=[];
    this.archivosFil=[];
    this.miembroSubmitted = false;
    this.hrefPathFile = false;
    this.estadoImg = 'Imágen';
    this.estadoFil = 'Hoja de vida';
    this.colorCorreoInput = 'primary';
  }

  eliminarTexto(campo: string){
    this.miembroForm.get(campo).setValue('');
  }

}