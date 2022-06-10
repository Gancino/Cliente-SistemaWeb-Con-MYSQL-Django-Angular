import { Component, Input, OnInit } from '@angular/core';
import { Alertas } from '@data/constants';
import { API_ROUTES, IMAGES_ROUTES } from '@data/constants/routes';
import { IApiArchivo } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { DisparadorService } from '@data/services/disparador/disparador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-file',
  templateUrl: './card-file.component.html',
  styleUrls: ['./card-file.component.scss']
})
export class CardFileComponent implements OnInit {

  @Input() data!: IApiArchivo;
  public icon!: string;
  public filePath!: string;
  public filePathName!: string;

  constructor(
    private service: PrivateService,
    private disparadorService: DisparadorService
  ) { 
    this.icon = IMAGES_ROUTES.ICON_PDF;
  }

  ngOnInit(): void {
    this.filePath = API_ROUTES.MEDIA.DEFAULT + this.data.archivo_arch;
    let arr = this.data.archivo_arch.split('/');
    this.filePathName=arr[arr.length-1];
  }

  deleteClick(id: any){
    Swal.fire({
      title: Alertas.MSG_TITLE_DELETE_ARCHIVO, 
      text: Alertas.MSG_DELETE_ARCHIVO,
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
        this.service.deleteArchivo(id).subscribe(data=>{
          this.disparadorService.deleteArchivo.emit(data);
        })
      }
    })
  }

  hrefClick(){
    const hrefPath = document.getElementById(this.data.id_arch) as HTMLInputElement;
    hrefPath.click();
  }

}
