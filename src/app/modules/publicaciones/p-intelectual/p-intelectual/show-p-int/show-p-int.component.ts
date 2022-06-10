import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiPIntelectual } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-p-int',
  templateUrl: './show-p-int.component.html',
  styleUrls: ['./show-p-int.component.scss']
})
export class ShowPIntComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public pin!: any;
  public PIntelectualList!: IApiPIntelectual[];
  public AddEditPinComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal : NgbModal,
    private _snackBar : MatSnackBar
  ) { 
    this.PIntelectualList = [];
    this.displayedColumns = ['id_pin', 'titulo_pin', 'fecha_pin', 'opciones'];
    this.loading = true;
    this.AddEditPinComp = false;
  }

  ngOnInit(): void {
    this.refreshPinList();
  }

  public refreshPinList(){
    this.service.getPinList().subscribe(data => {
      this.loading=false;
      this.PIntelectualList=data;
      this.dataSource = new MatTableDataSource(this.PIntelectualList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshPinList();
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
    this.AddEditPinComp = true;
    this.estructModal(contenido);
    this.pin={
      id_pin:0,
      titulo_pin:"",
      fecha_pin:""
    }
    this.ModalTitle="Agregar una nueva propiedad intelectual";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditPinComp = false;
    this.refreshPinList();
  }

  editClick(contenido: any, item: any){
    this.AddEditPinComp = true;
    this.estructModal(contenido);
    this.pin=item;
    this.ModalTitle="Editar Propiedad Intelectual";
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
        this.service.deletePIntelectual(item.id_pin).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshPinList();
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
      this.refreshPinList();
      if(this.PIntelectualList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshPinList();
    }, 500);
  }

}
