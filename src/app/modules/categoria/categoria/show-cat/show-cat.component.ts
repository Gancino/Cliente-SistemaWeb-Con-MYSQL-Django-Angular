import { Component, OnInit } from '@angular/core';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.scss']
})
export class ShowCatComponent implements OnInit {

  ModalTitle!: string;
  ActivateAddEditCatComp:boolean=false;
  cat:any;

  CategoriaIdFilter:string="";
  CategoriaNombreFilter:string="";
  CategoriaListWithoutFilter:any=[];

  constructor(
    private service : SharedService
  ) { }

  CategoriaList: any=[];

  ngOnInit(): void {
    this.refreshCatList();
  }


  refreshCatList(){
    this.service.getCatList().subscribe(data => {
      this.CategoriaList=data;
      this.CategoriaListWithoutFilter=data;
    });
  }

  addClick(){
    this.cat={
      id_cat:0,
      nombre_cat:""
    }
    this.ModalTitle="Agregar una nueva categoria";
    this.ActivateAddEditCatComp=true;
  }
  closeClick(){
    this.ActivateAddEditCatComp=false;
    this.refreshCatList();
  }

  editClick(item: any){
    this.cat=item;
    this.ModalTitle="Editar Categoria";
    this.ActivateAddEditCatComp=true;
  }
  deleteClick(item: any){
    if(confirm('Esta seguro de eliminar este registro??')){
      this.service.deleteCategoria(item.id_cat).subscribe(data=>{
        alert(data.toString());
        this.refreshCatList();
      })
    }
  }


  FilterFn(){
    var CategoriaIdFilter = this.CategoriaIdFilter;
    var CategoriaNombreFilter = this.CategoriaNombreFilter;

    this.CategoriaList = this.CategoriaListWithoutFilter.filter(function (el: any){
      return el.id_cat.toString().toLowerCase().includes(
        CategoriaIdFilter.toString().trim().toLowerCase()
      )&&
      el.nombre_cat.toString().toLowerCase().includes(
        CategoriaNombreFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any, asc:boolean){
    this.CategoriaList = this.CategoriaListWithoutFilter.sort(function(a:any, b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
  
}
