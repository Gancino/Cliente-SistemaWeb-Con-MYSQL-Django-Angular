import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiTesis } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-tes',
  templateUrl: './show-tes.component.html',
  styleUrls: ['./show-tes.component.scss']
})
export class ShowTesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public tes!: any;
  public TesisList!: IApiTesis[];
  public AddEditTesComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal: NgbModal,
    private _snackBar: MatSnackBar
  ) {
    this.TesisList = [];
    this.displayedColumns = ['id_tes', 'titulo_tes', 'anio_tes', 'universidad_tes', 'opciones'];
    this.loading = true;
    this.AddEditTesComp = false;
  }

  ngOnInit(): void {
    this.refreshTesList();
  }

  refreshTesList(){
    this.service.getTesList().subscribe(data => {
      this.loading=false;
      this.TesisList=data;
      this.dataSource = new MatTableDataSource(this.TesisList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshTesList();
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
    this.AddEditTesComp = true;
    this.estructModal(contenido);
    this.tes={
    id_tes : 0,
    titulo_tes : "",
    anio_tes : "",
    directores_tes : "",
    autores_tes : "",
    universidad_tes: "",
    tipo_tes : "",
    }
    this.ModalTitle="Agregar una nueva tesis";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditTesComp = false;
    this.refreshTesList();
  }

  editClick(contenido: any, item: any){
    this.AddEditTesComp = true;
    this.estructModal(contenido);
    this.tes=item;
    this.ModalTitle="Editar Tesis";
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
        this.service.deleteTesis(item.id_tes).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshTesList();
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
      this.refreshTesList();
      if(this.TesisList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshTesList();
    }, 500);
  }

}
