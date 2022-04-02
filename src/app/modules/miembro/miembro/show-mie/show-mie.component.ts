import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiMiembro } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-mie',
  templateUrl: './show-mie.component.html',
  styleUrls: ['./show-mie.component.scss']
})
export class ShowMieComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  ModalTitle!: string;
  miem:any;
  MiembroList: IApiMiembro[];

  constructor(
    private service : PrivateService,
    public modal: NgbModal,
    private _snackBar : MatSnackBar
  ) { 
    this.MiembroList = [];
    this.displayedColumns = ['id_miem', 'nombre_miem', 'apellido_miem', 'correo_miem', 'cargo_miem', 'opciones'];
    this.loading = true;
  }

  ngOnInit(): void {
    this.refreshMiemList();
  }

  refreshMiemList(){
    this.service.getMiemList().subscribe(data => {
      this.loading=false;
      this.MiembroList=data;
      this.dataSource = new MatTableDataSource(this.MiembroList);
      this.dataSource.paginator = this.paginator;
      //this.dataSource.paginator._intl.itemsPerPageLabel='Items por página';
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshMiemList();
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
    this.miem={
    id_miem : 0,
    nombre_miem : "",
    apellido_miem : "",
    correo_miem : "",
    telefono_miem : "",
    imagen_miem : "",
    cargo_miem : "",
    descripcion_miem : "",
    }
    this.ModalTitle="Agregar un nuevo miembro";
  }
  closeClick(){
    this.modal.dismissAll();
    this.refreshMiemList();
  }

  editClick(contenido: any, item: any){
    this.estructModal(contenido);
    console.log(item);
    this.miem=item;
    this.ModalTitle="Editar Miembro";
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
        this.service.deleteMiembro(item.id_miem).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          //alert(data.toString());
          this.refreshMiemList();
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
      this.refreshMiemList();
      if(this.MiembroList.length>0){
        Alertas.mostrarToast('Datos obtenidos correctamente!', this._snackBar);
      }else{
        Alertas.mostrarToast('No existen registros!', this._snackBar);
      }
      this.refreshMiemList();
    }, 500)
  }
  
}
