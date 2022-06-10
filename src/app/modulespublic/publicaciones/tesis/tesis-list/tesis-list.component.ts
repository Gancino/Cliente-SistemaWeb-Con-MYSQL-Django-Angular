import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiTesis } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import { Subscription } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-tesis-list',
  templateUrl: './tesis-list.component.html',
  styleUrls: ['./tesis-list.component.scss']
})
export class TesisListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public tesis!: IApiTesis[]; // USERS_DATA;
  public title!: string;
  public tesisSubscription!: Subscription;
  public aniosAll!: string[];
  public aniosExist!: string[];

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Lista de tesis');
    this.title = this.service.getTitle();
  }

  ngOnInit(): void {
    this.getTesis();
  }

  getTesis(){
    this.tesisSubscription = this.service
      .getAllTesis()
      .subscribe(r => {
        this.tesis = (r.error) ? [] : r.data;
        if(this.tesis.length > 0){
          this.obtenerAnios();
        }
        this.dataSource = new MatTableDataSource(this.tesis);
      });
  }

  obtenerAnios(){
    this.aniosAll = [];
    this.aniosExist = [];
    for(let i=0; i<this.tesis.length;i++){ 
      this.aniosAll.push(this.tesis[i]['anio_tes'].toString()); 
    }
    for(let k=0; k<this.aniosAll.length; k++){
      let exist = false;
      for(let x=0; x<this.aniosExist.length; x++){
        if(this.aniosAll[k] == this.aniosExist[x])
        {
          exist = true;
        }
      }
      if(!exist){
        this.aniosExist.push(this.aniosAll[k]);
      }
    }
    this.aniosExist.sort().reverse();
  }

  trackByTesisId(index: any, item: { id_tes: any; }){
    return item.id_tes;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.tesisSubscription) {
      this.tesisSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  scrollToUp(){
    $("html, body").animate({ scrollTop: 0 }, 100);
  }
  
}
