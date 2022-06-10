import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ROUTES, IMAGES_ROUTES } from '@data/constants/routes';
import { IApiMiembro } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';

@Component({
  selector: 'app-miembros-detail',
  templateUrl: './miembros-detail.component.html',
  styleUrls: ['./miembros-detail.component.scss']
})
export class MiembrosDetailComponent implements OnInit{

  public miembros!: IApiMiembro[];
  public id_miem!: number;
  public currentMiembro!: IApiMiembro;
  public PhotoFilePath!: String;
  public filePath!: string;
  public hrefPathFile!: boolean;
  public loader!: string;
  public title!: string;

  constructor(
    private route: ActivatedRoute,
    private service: PublicService
  ) {
    this.miembros = [];
    this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    this.loader = IMAGES_ROUTES.LOADER_ITEM_DETAIL;
    this.hrefPathFile = false;
    this.title = this.service.getTitle();
    this.service.getAllMiembros().subscribe(r => {
      if(!r.error){
        this.miembros = r.data;
      }
    });
    //El simbolo "+" lo transforma a entero
    this.id_miem = +this.route.snapshot.params.id;
    this.currentMiembro = this.miembros.find(user => user.id_miem === this.id_miem)!;
  }

  ngOnInit(): void{
    this.service.getMiembroById(this.id_miem).subscribe( r =>{
      if (!r.error){
        this.currentMiembro = r.data;
        if(this.currentMiembro.imagen_miem == '' || this.currentMiembro.imagen_miem == null ){
          this.PhotoFilePath=IMAGES_ROUTES.USER_CONTENT;
        }else{
          this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.currentMiembro.imagen_miem;
        }
        if(this.currentMiembro.hvida_miem !== '' && this.currentMiembro.hvida_miem !== null ){
          this.hrefPathFile=true;
          this.filePath=API_ROUTES.MEDIA.DEFAULT+this.currentMiembro.hvida_miem;
        }else{
          this.hrefPathFile=false;
          this.filePath="#";
        }
      }
    });
  }

  abrirHrefFile(){
    if(this.currentMiembro.hvida_miem != null){
      const hrefPath = document.getElementById('hrefHojaVidaMiembro') as HTMLInputElement;
      hrefPath.click();
    }
  }

}

