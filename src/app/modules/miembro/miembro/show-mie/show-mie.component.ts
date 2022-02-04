import { Component, OnInit } from '@angular/core';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-show-mie',
  templateUrl: './show-mie.component.html',
  styleUrls: ['./show-mie.component.scss']
})
export class ShowMieComponent implements OnInit {

  MiembroList: any=[];
  ModalTitle!: string;
  ActivateAddEditMiemComp:boolean=false;
  miem:any;

  MiembroIdFilter:string="";
  MiembroNombreFilter:string="";
  MiembroListWithoutFilter:any=[];

  constructor(
    private service : SharedService
  ) { }

  ngOnInit(): void {
    this.refreshMiemList();
  }


  refreshMiemList(){
    this.service.getMiemList().subscribe(data => {
      this.MiembroList=data;
      this.MiembroListWithoutFilter=data;
    });
  }

  addClick(){
    this.miem={
    id_miem : 0,
    nombre_miem : "",
    apellido_miem : "",
    correo_miem : "",
    telefono_miem : "",
    imagen_miem : "anonymous.png",
    cargo_miem : "",
    descripcion_miem : "",
    }
    this.ModalTitle="Agregar una nuevo miembro";
    this.ActivateAddEditMiemComp=true;
  }
  closeClick(){
    this.ActivateAddEditMiemComp=false;
    this.refreshMiemList();
  }

  editClick(item: any){
    this.miem=item;
    this.ModalTitle="Editar Miembro";
    this.ActivateAddEditMiemComp=true;
  }
  deleteClick(item: any){
    if(confirm('Esta seguro de eliminar este registro??')){
      this.service.deleteMiembro(item.id_miem).subscribe(data=>{
        alert(data.toString());
        this.refreshMiemList();
      })
    }
  }

  FilterFn(){
    var MiembroIdFilter = this.MiembroIdFilter;
    var MiembroNombreFilter = this.MiembroNombreFilter;

    this.MiembroList = this.MiembroListWithoutFilter.filter(function (el: any){
      return el.id_miem.toString().toLowerCase().includes(
        MiembroIdFilter.toString().trim().toLowerCase()
      )&&
      el.nombre_miem.toString().toLowerCase().includes(
        MiembroNombreFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any, asc:boolean){
    this.MiembroList = this.MiembroListWithoutFilter.sort(function(a:any, b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }

}
