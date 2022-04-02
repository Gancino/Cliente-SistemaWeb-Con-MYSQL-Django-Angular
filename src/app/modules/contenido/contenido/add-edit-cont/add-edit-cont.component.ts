import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { API_ROUTES } from '@data/constants/routes';
import { IApiCategoria } from '@data/interfaces';
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
  public loading: boolean;

  PhotoFilePath!: string;
  filePath!: string;
  filePathName!: string;
  ContenidoList:any=[];
  CategoriaList:IApiCategoria[];

  public archivosImg:any=[];
  public archivosFil:any=[];
  public estadoImg:string;
  public estadoFil:string;
  public hrefPathFile:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.CategoriaList=[];
    this.contenidoSubmitted = false;
    this.loading = false;
    this.hrefPathFile = false;
    this.estadoImg='Subir imágen';
    this.estadoFil='Subir archivo';
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
        let arr = this.contenidoForm.get('archivo_con').value.split('/');
        this.filePathName=arr[arr.length-1];
        this.hrefPathFile=true;
      }
      else{
        this.hrefPathFile=false;
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
    this.loading=true;
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
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro agregado correctamente en el sistema.','success');
            this.contenidoForm.reset();
            this.reiniciarForm(['titulo_con', 'fecha_con', 'autor_con', 'descripcion_con', 'fk_id_cat']);
          }else{
            Alertas.mostrarAlert('Error!','¡Error al agregar el registro, intentalo de nuevo!','error');
          }
        }, 500);
        //alert(r.msg.toString());
      });
    }
    else{
      formData.append('id_con', this.contenidoForm.get('id_con').value);
      this.service.updateContenido(formData).subscribe( r =>{
        //alert(r.msg.toString());
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro actualizado correctamente.','success');
          }else{
            Alertas.mostrarAlert('Error!','¡Error al actualizar el registro, intentalo de nuevo!','error');
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

  abrirInputFil(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }
  abrirInputImg(){
    const imgUpload = document.getElementById('imgUpload') as HTMLInputElement;
    imgUpload.click();
  }
  abrirHrefFile(){
    if(this.con.archivo_con != null){
      const hrefPath = document.getElementById('hrefPathFile') as HTMLInputElement;
      hrefPath.click();
    }
  }

  reiniciarForm(campo: any[]){
    for (let i=0; i < campo.length; i++){
      this.contenidoForm.get(campo[i]).setValue('');  
    } 
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN + 'anonymous.png';
    this.archivosImg=[];
    this.archivosFil=[];
    this.contenidoSubmitted = false;
    this.estadoImg='Subir imágen';
    this.estadoFil='Subir archivo';
  }

  eliminarTexto(campo: string){
    this.contenidoForm.get(campo).setValue('');
  }

  
  

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
