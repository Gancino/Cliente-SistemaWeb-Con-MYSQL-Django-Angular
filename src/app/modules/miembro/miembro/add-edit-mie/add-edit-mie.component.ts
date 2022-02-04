import { Component, Input, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-mie',
  templateUrl: './add-edit-mie.component.html',
  styleUrls: ['./add-edit-mie.component.scss']
})
export class AddEditMieComponent implements OnInit {

  @Input() miem:any;
  id_miem:string;
  nombre_miem!:string;
  apellido_miem!:string;
  correo_miem!:string;
  telefono_miem!:string;
  imagen_miem!:string;
  cargo_miem!:string;
  descripcion_miem!:string;
  PhotoFilePath!: String;
  MiembroList:any=[];

  constructor(
    private service : SharedService
  ) { }

  ngOnInit(): void {
    this.loadMiembroList();
  }

  loadMiembroList(){
    this.id_miem=this.miem.id_miem;
    this.nombre_miem=this.miem.nombre_miem;
    this.apellido_miem=this.miem.apellido_miem;
    this.correo_miem=this.miem.correo_miem;
    this.telefono_miem=this.miem.telefono_miem;
    this.imagen_miem=this.miem.imagen_miem;
    this.cargo_miem=this.miem.cargo_miem;
    this.descripcion_miem=this.miem.descripcion_miem;
    this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.miem.imagen_miem;
  }

  addMiembro(){
    if(this.imagen_miem == null){
      this.imagen_miem = "anonymous.png"
    }
    var val = {id_miem:this.id_miem,
                nombre_miem:this.nombre_miem,
                apellido_miem:this.apellido_miem,
                correo_miem:this.correo_miem,
                telefono_miem:this.telefono_miem,
                imagen_miem:this.imagen_miem,
                cargo_miem:this.cargo_miem,
                descripcion_miem:this.descripcion_miem};
    this.service.addMiembro(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateMiembro(){
    var val = {id_miem:this.id_miem,
                nombre_miem:this.nombre_miem,
                apellido_miem:this.apellido_miem,
                correo_miem:this.correo_miem,
                telefono_miem:this.telefono_miem,
                imagen_miem:this.imagen_miem,
                cargo_miem:this.cargo_miem,
                descripcion_miem:this.descripcion_miem};
    this.service.updateMiembro(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadFile(formData).subscribe((data:any)=>{
      this.imagen_miem=data.toString();
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+this.imagen_miem;
    });
  }
}
