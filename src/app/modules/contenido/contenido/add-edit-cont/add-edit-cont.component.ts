import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { API_ROUTES } from '@data/constants/routes';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-cont',
  templateUrl: './add-edit-cont.component.html',
  styleUrls: ['./add-edit-cont.component.scss']
})
export class AddEditContComponent implements OnInit {

  @Input() con:any;
  public contenidoSubmitted;
  public contenidoForm: FormGroup;

  PhotoFilePath!: String;
  filePath!: String;
  ContenidoList:any=[];
  CategoriaList:any=[];

  constructor(
    private formBuilder: FormBuilder,
    private service : SharedService
  ) { 
    this.contenidoSubmitted = false;
    this.contenidoForm = this.formBuilder.group({
      id_con:[
        ''
      ],
      titulo_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      descripcion_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      archivo_con: [
        '', 
        [
          Validators.maxLength(200)
        ]
      ],
      imagen_con: [
        '', 
        [
          Validators.maxLength(100)
        ]
      ],
      fecha_con: [
        '', 
        [
          Validators.required
        ]
      ],
      autor_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      fk_id_cat: [
        '', 
        [
          Validators.required
        ]
      ]
    });
  }

  get cont(){
    return this.contenidoForm.controls;
  }

  ngOnInit(): void {
    this.loadContenidoList();
  }

  loadContenidoList(){
    this.service.getAllCategoriaNombres().subscribe((data:any)=>{
      this.CategoriaList=data;

      this.contenidoForm.get('id_con').setValue(this.con.id_con);
      this.contenidoForm.get('titulo_con').setValue(this.con.titulo_con);
      this.contenidoForm.get('descripcion_con').setValue(this.con.descripcion_con);
      this.contenidoForm.get('archivo_con').setValue(this.con.archivo_con);
      this.contenidoForm.get('imagen_con').setValue(this.con.imagen_con);
      this.contenidoForm.get('fecha_con').setValue(this.con.fecha_con);
      this.contenidoForm.get('autor_con').setValue(this.con.autor_con);
      this.contenidoForm.get('fk_id_cat').setValue(this.con.fk_id_cat);
      this.filePath=API_ROUTES.PhotoUrl.IMAGEN+this.con.archivo_con;
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.con.imagen_con;
    });
  }

  addEditContenido(){

    this.contenidoSubmitted = true;
    if (!this.contenidoForm.valid)
    {
      return;
    }

    if(this.con.id_con==0){
      this.service.addContenido(this.contenidoForm.value).subscribe( r => {
        alert(r.msg.toString());
      });
    }
    else{
      this.service.updateContenido(this.contenidoForm.value).subscribe( r =>{
        alert(r.msg.toString());
      });
    }
  }

  uploadFile(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadFile(formData).subscribe((data:any)=>{
      this.contenidoForm.get('archivo_con').setValue(data.toString());
      this.filePath=API_ROUTES.PhotoUrl.IMAGEN+this.contenidoForm.get('archivo_con').value;
    });
  }

  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadImage(formData).subscribe((data:any)=>{
      this.contenidoForm.get('imagen_con').setValue(data.toString());
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.contenidoForm.get('imagen_con').value;
    });
  }

  /*
  capturarImage(event:any){
    this.imagenCapturada = event.target.files[0]
    this.extraerBase64(this.imagenCapturada).then((imagen: any) => {
      this.PhotoFilePath = imagen.base;
    })
  }

  subirArchivo() {
    const formData:FormData=new FormData();
    formData.append('uploadedFile',this.imagenCapturada,this.imagenCapturada.name);

    this.service.UploadFile(formData).subscribe((data:any)=>{
      this.contenidoForm.get('imagen_con').setValue(data.toString());
      console.log(this.contenidoForm.get('imagen_con').value)
    });
    console.log("hola"+this.contenidoForm.get('imagen_con').value)
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
  */
}
