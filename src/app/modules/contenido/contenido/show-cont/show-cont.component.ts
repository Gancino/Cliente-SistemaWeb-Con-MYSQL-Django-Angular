import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiContenido } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-cont',
  templateUrl: './show-cont.component.html',
  styleUrls: ['./show-cont.component.scss']
})
export class ShowContComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;  

  ModalTitle!: string;
  con:any;
  ContenidoList: IApiContenido[];

  constructor(
    private service : PrivateService,
    public modal: NgbModal,
    private _snackBar: MatSnackBar
  ) { 
    this.ContenidoList = [];
    this.displayedColumns = ['id_con', 'titulo_con', 'fecha_con', 'autor_con', 'opciones'];
    this.loading = true;
  }

  ngOnInit(): void {
    this.refreshConList();
  }

  refreshConList(){
    this.service.getContList().subscribe(data => {
      this.loading=false;
      this.ContenidoList=data;
      this.dataSource = new MatTableDataSource(this.ContenidoList);
      this.dataSource.paginator = this.paginator;
      //this.dataSource.paginator._intl.itemsPerPageLabel='Items por página';
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshConList();
  }

  estructModal(content: any){
    this.modal.open(content,{
      size: 'xl',
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  addClick(contenido: any){
    this.estructModal(contenido);
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
  }
  closeClick(){
    this.modal.dismissAll();
    this.refreshConList();
  }

  editClick(contenido: any, item: any){
    this.estructModal(contenido);
    this.con=item;
    this.ModalTitle="Editar Contenido";
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
        this.service.deleteContenido(item.id_con).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          //alert(data.toString());
          this.refreshConList();
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
      this.refreshConList();
      if(this.ContenidoList.length>0){
        Alertas.mostrarToast('Datos obtenidos correctamente!', this._snackBar);
      }else{
        Alertas.mostrarToast('No existen registros!', this._snackBar);
      }
      this.refreshConList();
    }, 500)
  }


}
