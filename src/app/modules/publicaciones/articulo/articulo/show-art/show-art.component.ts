import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiArticulo } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-art',
  templateUrl: './show-art.component.html',
  styleUrls: ['./show-art.component.scss']
})
export class ShowArtComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public art!: any;
  public ArticuloList!: IApiArticulo[];
  public AddEditArtComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal: NgbModal,
    private _snackBar: MatSnackBar
  ) { 
    this.ArticuloList = [];
    this.displayedColumns = ['id_art', 'titulo_art', 'indexacion_art', 'issn_art', 'opciones'];
    this.loading = true;
    this.AddEditArtComp = false;
  }

  ngOnInit(): void {
    this.refreshArtList();
  }

  refreshArtList(){
    this.service.getArtList().subscribe(data => {
      this.loading=false;
      this.ArticuloList=data;
      this.dataSource = new MatTableDataSource(this.ArticuloList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshArtList();
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
    this.AddEditArtComp = true;
    this.estructModal(contenido);
    this.art={
    id_art : 0,
    titulo_art : "",
    enlace_art : "",
    indexacion_art : "",
    desc_art : "",
    autores_art : "",
    issn_art : "",
    }
    this.ModalTitle="Agregar un nuevo artículo";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditArtComp = false;
    this.refreshArtList();
  }

  editClick(contenido: any, item: any){
    this.AddEditArtComp = true;
    this.estructModal(contenido);
    this.art=item;
    this.ModalTitle="Editar Artículo";
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
        this.service.deleteArticulo(item.id_art).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshArtList();
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
      this.refreshArtList();
      if(this.ArticuloList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshArtList();
    }, 500);
  }

}
