import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiCategoria } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.scss']
})

export class ShowCatComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  ModalTitle!: string;
  cat:any;
  CategoriaList: IApiCategoria[];

  constructor(
    private service : PrivateService,
    public modal : NgbModal,
    private _snackBar : MatSnackBar
  ) {
    this.CategoriaList = [];
    this.displayedColumns = ['id_cat', 'nombre_cat', 'opciones'];
    this.loading = true;
  }

  ngOnInit(): void {
    this.refreshCatList();
  }

  public refreshCatList(){
    this.service.getCatList().subscribe(data => {
      this.loading=false;
      this.CategoriaList=data;
      this.dataSource = new MatTableDataSource(this.CategoriaList);
      this.dataSource.paginator = this.paginator;
      //this.dataSource.paginator._intl.itemsPerPageLabel='Items por página';
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshCatList();
  }

  estructModal(content: any){
    this.modal.open(content,{
      size: 'md',
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  addClick(contenido: any){
    this.estructModal(contenido);
    this.cat={
      id_cat:0,
      nombre_cat:""
    }
    this.ModalTitle="Agregar una nueva categoría";
  }

  closeClick(){
    this.modal.dismissAll();
    this.refreshCatList();
  }

  editClick(contenido: any, item: any){
    this.estructModal(contenido);
    this.cat=item;
    this.ModalTitle="Editar Categoría";
  }
  deleteClick(item: any){
    Swal.fire({
      title: 'Eliminar registro!', 
      text: '¿Esta seguro de eliminar este registro?',
      width: '40%',
      padding: '1rem',
      backdrop: true,
      position: 'center',
      allowOutsideClick: true,
      stopKeydownPropagation: false,
      confirmButtonColor: '#3f51b5',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCategoria(item.id_cat).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          //alert(data.toString());
          this.refreshCatList();
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  recargarLista(){
    this.loading=true;
    setTimeout(() => {
      this.refreshCatList();
      if(this.CategoriaList.length>0){
        Alertas.mostrarToast('Datos obtenidos correctamente!', this._snackBar);
      }else{
        Alertas.mostrarToast('No existen registros!', this._snackBar);
      }
      this.refreshCatList();
    }, 500)
  }

}
