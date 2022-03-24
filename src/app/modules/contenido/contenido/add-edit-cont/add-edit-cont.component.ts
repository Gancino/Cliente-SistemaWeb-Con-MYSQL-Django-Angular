import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '@data/constants/routes';
import { PrivateService } from '@data/services/api/private.service';

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
  filePathName!: String;
  ContenidoList:any=[];
  CategoriaList:any=[];

  public archivosImg:any=[];
  public archivosFil:any=[];

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
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
          Validators.maxLength(300)
        ]
      ],
      imagen_con: [
        '', 
        [
          Validators.maxLength(300)
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
      if(this.con.archivo_con !== '' && this.con.archivo_con !== null ){
        this.contenidoForm.get('archivo_con').setValue(this.con.archivo_con);
        let arr = this.contenidoForm.get('archivo_con').value.split('/')
        this.filePathName=arr[arr.length-1]
      }
      else{
        this.contenidoForm.get('archivo_con').setValue('');
      }
      
      this.contenidoForm.get('fecha_con').setValue(this.con.fecha_con);
      this.contenidoForm.get('autor_con').setValue(this.con.autor_con);
      this.contenidoForm.get('fk_id_cat').setValue(this.con.fk_id_cat);
      if(this.con.imagen_con == '' || this.con.imagen_con == null ){
        this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN + 'anonymous.png';
        this.contenidoForm.get('imagen_con').setValue('');

      }else{
        this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.con.imagen_con;
        this.contenidoForm.get('imagen_con').setValue(this.con.imagen_con);
      }
      this.filePath=API_ROUTES.PhotoUrl.MEDIA+this.con.archivo_con;
    });
  }

  addEditContenido(){
    this.contenidoSubmitted = true;
    if (!this.contenidoForm.valid)
    {
      return;
    }
    const formData = new FormData();
    if(this.archivosImg.length>0){
      this.archivosImg.forEach((imagen:any) => {
        formData.append('imagen_con', imagen)
      })
    }
    if(this.archivosFil.length>0){
      this.archivosFil.forEach((archivo:any) => {
        formData.append('archivo_con', archivo)
      })
    }

    formData.append('titulo_con', this.contenidoForm.get('titulo_con').value);
    formData.append('descripcion_con', this.contenidoForm.get('descripcion_con').value);
    formData.append('fecha_con', this.contenidoForm.get('fecha_con').value);
    formData.append('autor_con', this.contenidoForm.get('autor_con').value);
    formData.append('fk_id_cat', this.contenidoForm.get('fk_id_cat').value);

    if(this.con.id_con==0){
      this.service.addContenido(formData).subscribe( r => {
        alert(r.msg.toString());
      });
    }
    else{
      formData.append('id_con', this.contenidoForm.get('id_con').value);
      this.service.updateContenido(formData).subscribe( r =>{
        alert(r.msg.toString());
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
    }
  }

  onChangeFil(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivosFil.push(file)
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
  */
}
