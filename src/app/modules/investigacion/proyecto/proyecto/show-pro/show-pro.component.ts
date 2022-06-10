import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiProyecto } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-pro',
  templateUrl: './show-pro.component.html',
  styleUrls: ['./show-pro.component.scss']
})
export class ShowProComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public pro!: any;
  public ProyectoList!: IApiProyecto[];
  public AddEditProComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal: NgbModal,
    private _snackBar: MatSnackBar
  ) { 
    this.ProyectoList = [];
    this.displayedColumns = ['id_pro', 'titulo_pro', 'responsable_pro', 'periodo_pro', 'opciones'];
    this.loading = true;
    this.AddEditProComp = false;
  }

  ngOnInit(): void {
    this.refreshProList();
  }

  refreshProList(){
    this.service.getProList().subscribe(data => {
      this.loading=false;
      this.ProyectoList=data;
      this.dataSource = new MatTableDataSource(this.ProyectoList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshProList();
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
    this.AddEditProComp = true;
    this.estructModal(contenido);
    this.pro={
      id_pro : 0,
      titulo_pro : "",
      fecha_pro : "",
      responsable_pro : "",
      investigadores_pro : "",
      periodo_pro : "",
      descripcion_pro : "",
    }
    this.ModalTitle="Agregar un nuevo proyecto";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditProComp = false;
    this.refreshProList();
  }

  editClick(contenido: any, item: any){
    this.AddEditProComp = true;
    this.estructModal(contenido);
    this.pro=item;
    this.ModalTitle="Editar Proyecto";
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
        this.service.deleteProyecto(item.id_pro).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshProList();
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
      this.refreshProList();
      if(this.ProyectoList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshProList();
    }, 500);
  }

}
