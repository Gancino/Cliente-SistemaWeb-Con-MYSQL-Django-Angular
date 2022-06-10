import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiLibro } from '@data/interfaces/api/iapi-libros.metadata';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-lib',
  templateUrl: './show-lib.component.html',
  styleUrls: ['./show-lib.component.scss']
})
export class ShowLibComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public lib!: any;
  public LibroList!: IApiLibro[];
  public AddEditLibComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal: NgbModal,
    private _snackBar: MatSnackBar
  ) {
    this.LibroList = [];
    this.displayedColumns = ['id_lib', 'titulo_lib', 'desc_lib', 'issn_lib', 'opciones'];
    this.loading = true;
    this.AddEditLibComp = false;
  }

  ngOnInit(): void {
    this.refreshLibList();
  }

  refreshLibList(){
    this.service.getLibList().subscribe(data => {
      this.loading=false;
      this.LibroList=data;
      this.dataSource = new MatTableDataSource(this.LibroList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshLibList();
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
    this.AddEditLibComp = true;
    this.estructModal(contenido);
    this.lib={
    id_lib : 0,
    titulo_lib : "",
    desc_lib : "",
    autores_lib : "",
    issn_lib : "",
    tipo_lib : "",
    }
    this.ModalTitle="Agregar un nuevo libro";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditLibComp = false;
    this.refreshLibList();
  }

  editClick(contenido: any, item: any){
    this.AddEditLibComp = true;
    this.estructModal(contenido);
    this.lib=item;
    this.ModalTitle="Editar Libro";
  }

  deleteClick(item: any){
    Swal.fire({
      title: Alertas.MSG_TITLE_DELETE, 
      text: Alertas.MSG_DELETE,
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
      cancelButtonText: Alertas.MSG_CANCEL_DELETE,
      confirmButtonText: Alertas.MSG_CONFIRM_DELETE
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteLibro(item.id_lib).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshLibList();
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
      this.refreshLibList();
      if(this.LibroList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshLibList();
    }, 500);
  }

}
