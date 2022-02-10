import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '@data/constants/routes';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-mie',
  templateUrl: './add-edit-mie.component.html',
  styleUrls: ['./add-edit-mie.component.scss']
})
export class AddEditMieComponent implements OnInit {

  @Input() miem:any;
  public miembroSubmitted;
  public miembroForm: FormGroup;
  PhotoFilePath!: String;
  MiembroList:any=[];
  public archivos:any=[];
  constructor(
    private formBuilder: FormBuilder,
    private service : SharedService
  ) {
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
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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
          Validators.maxLength(100)
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
    this.miembroForm.get('imagen_miem').setValue(this.miem.imagen_miem);
    this.miembroForm.get('cargo_miem').setValue(this.miem.cargo_miem);
    this.miembroForm.get('descripcion_miem').setValue(this.miem.descripcion_miem);
    if(this.miem.imagen_miem == '' || this.miem.imagen_miem == null ){
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+'anonymous.png';
    }else{
      this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.miem.imagen_miem;
    }
  }

  addEditMiembro(){
    this.miembroSubmitted = true;
    if (!this.miembroForm.valid)
    {
      return;
    }
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
        alert(r.msg.toString());
      });
    }
    else{
      formData.append('id_miem', this.miembroForm.get('id_miem').value);
      this.service.updateMiembro(formData).subscribe( r =>{
        alert(r.msg.toString());
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