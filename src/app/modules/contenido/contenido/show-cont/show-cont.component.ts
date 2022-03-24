import { Component, OnInit } from '@angular/core';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-show-cont',
  templateUrl: './show-cont.component.html',
  styleUrls: ['./show-cont.component.scss']
})
export class ShowContComponent implements OnInit {

  ContenidoList: any=[];
  ModalTitle!: string;
  ActivateAddEditConComp:boolean=false;
  con:any;

  ContenidoIdFilter:string="";
  ContenidoTituloFilter:string="";
  ContenidoListWithoutFilter:any=[];

  constructor(
    private service : PrivateService
  ) { }

  ngOnInit(): void {
    this.refreshConList();
  }

  refreshConList(){
    this.service.getContList().subscribe(data => {
      this.ContenidoList=data;
      this.ContenidoListWithoutFilter=data;
    });
  }

  addClick(){
    this.con={
    id_con : 0,
    titulo_con : "",
    descripcion_con : "",
    archivo_con : "",
    imagen_con : "",
    fecha_con : "",
    autor_con : "",
    fk_id_cat : "",

    }
    this.ModalTitle="Agregar un nuevo contenido";
    this.ActivateAddEditConComp=true;
  }
  closeClick(){
    this.ActivateAddEditConComp=false;
    this.refreshConList();
  }

  editClick(item: any){
    this.con=item;
    this.ModalTitle="Editar Contenido";
    this.ActivateAddEditConComp=true;
  }
  deleteClick(item: any){
    if(confirm('Esta seguro de eliminar este registro??')){
      this.service.deleteContenido(item.id_con).subscribe(data=>{
        alert(data.toString());
        this.refreshConList();
      })
    }
  }

  FilterFn(){
    var ContenidoIdFilter = this.ContenidoIdFilter;
    var ContenidoTituloFilter = this.ContenidoTituloFilter;

    this.ContenidoList = this.ContenidoListWithoutFilter.filter(function (el: any){
      return el.id_con.toString().toLowerCase().includes(
        ContenidoIdFilter.toString().trim().toLowerCase()
      )&&
      el.titulo_con.toString().toLowerCase().includes(
        ContenidoTituloFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any, asc:boolean){
    this.ContenidoList = this.ContenidoListWithoutFilter.sort(function(a:any, b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }

  recargar(){
    this.refreshConList();
    this.ContenidoIdFilter='';
    this.ContenidoTituloFilter='';
  }

}
