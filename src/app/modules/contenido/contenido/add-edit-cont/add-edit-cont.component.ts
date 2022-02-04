import { Component, Input, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-cont',
  templateUrl: './add-edit-cont.component.html',
  styleUrls: ['./add-edit-cont.component.scss']
})
export class AddEditContComponent implements OnInit {

  @Input() con:any;
  id_con:string;
  titulo_con!:string;
  descripcion_con!:string;
  archivo_con!:string;
  imagen_con!:string;
  fecha_con!:string;
  autor_con!:string;
  fk_id_cat!:string;
  PhotoFilePath!: String;
  filePath!: String;
  ContenidoList:any=[];
  CategoriaList:any=[];

  constructor(
    private service : SharedService
  ) { }

  ngOnInit(): void {
    this.loadContenidoList();
  }

  loadContenidoList(){
    this.service.getAllCategoriaNombres().subscribe((data:any)=>{
      this.CategoriaList=data;

      this.id_con=this.con.id_con;
      this.titulo_con=this.con.titulo_con;
      this.descripcion_con=this.con.descripcion_con;
      this.archivo_con=this.con.archivo_con;
      this.imagen_con=this.con.image_con;
      this.fecha_con=this.con.fecha_con;
      this.autor_con=this.con.autor_con;
      this.fk_id_cat=this.con.fk_id_cat;
      this.filePath=API_ROUTES.PhotoUrl.IMAGEN+this.con.archivo_con;
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.con.imagen_con;

    });
  }

  addContenido(){
    if(this.imagen_con == null){
      this.imagen_con = "anonymous.png"
    }
    if(this.archivo_con == null){
      this.archivo_con = ""
    }
    var val = {id_con:this.id_con,
                titulo_con:this.titulo_con,
                descripcion_con:this.descripcion_con,
                archivo_con:this.archivo_con,
                imagen_con:this.imagen_con,
                fecha_con:this.fecha_con,
                autor_con:this.autor_con,
                fk_id_cat:this.fk_id_cat};
    this.service.addContenido(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateContenido(){
    var val = {id_con:this.id_con,
                titulo_con:this.titulo_con,
                descripcion_con:this.descripcion_con,
                archivo_con:this.archivo_con,
                imagen_con:this.imagen_con,
                fecha_con:this.fecha_con,
                autor_con:this.autor_con,
                fk_id_cat:this.fk_id_cat};
    this.service.updateContenido(val).subscribe(res=>{
      alert(res.toString());
    });
  }


  uploadFile(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadFile(formData).subscribe((data:any)=>{
      this.archivo_con=data.toString();
      this.filePath=API_ROUTES.PhotoUrl.IMAGEN+this.archivo_con;
    });
  }

  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadFile(formData).subscribe((data:any)=>{
      this.imagen_con=data.toString();
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.imagen_con;
    });
  }
}
