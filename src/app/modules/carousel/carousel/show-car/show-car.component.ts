import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alertas } from '@data/constants';
import { IApiCarousel } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.scss']
})
export class ShowCarComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public loading!: boolean;
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<any>;

  public ModalTitle!: string;
  public car!: any;
  public CarouselList!: IApiCarousel[];
  public AddEditCarComp!: boolean;

  constructor(
    private service : PrivateService,
    private modal: NgbModal,
    private _snackBar : MatSnackBar
  ) {
    this.CarouselList = [];
    this.displayedColumns = ['id_car', 'titulopr_car', 'titulosec_car', 'subtitulo_car', 'opciones'];
    this.loading = true;
    this.AddEditCarComp = false;
  }

  ngOnInit(): void {
    this.refreshCarouselList();
  }

  refreshCarouselList(){
    this.service.getCarouselList().subscribe(data => {
      this.loading=false;
      this.CarouselList=data;
      this.dataSource = new MatTableDataSource(this.CarouselList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.refreshCarouselList();
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
    this.AddEditCarComp = true;
    this.estructModal(contenido);
    this.car={
    id_car : 0,
    titulopr_car : "",
    titulosec_car : "",
    subtitulo_car : "",
    imagen_car : ""
    }
    this.ModalTitle="Agregar contenido al Carousel";
  }

  closeClick(){
    this.modal.dismissAll();
    this.AddEditCarComp = false;
    this.refreshCarouselList();
  }

  editClick(contenido: any, item: any){
    this.AddEditCarComp = true;
    this.estructModal(contenido);
    console.log(item);
    this.car=item;
    this.ModalTitle="Editar contenido del Carousel";
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
        this.service.deleteCarousel(item.id_car).subscribe(data=>{
          Alertas.mostrarToast(data.toString(), this._snackBar);
          this.refreshCarouselList();
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
      this.refreshCarouselList();
      if(this.CarouselList.length>0){
        Alertas.mostrarToast(Alertas.MSG_LISTA_OBTENIDA, this._snackBar);
      }else{
        Alertas.mostrarToast(Alertas.MSG_LISTA_VACIA, this._snackBar);
      }
      this.refreshCarouselList();
    }, 500);
  }

}
