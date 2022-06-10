import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiCongreso } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-congresos-list',
  templateUrl: './congresos-list.component.html',
  styleUrls: ['./congresos-list.component.scss']
})
export class CongresosListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public congresos!: IApiCongreso[]; // USERS_DATA;
  public title!: string;
  public congresoSubscription!: Subscription;
  public aniosAll!: string[];
  public aniosExist!: string[];

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Lista de congresos');
    this.title = this.service.getTitle();
  }

  ngOnInit(): void {
    this.getCongresos();
  }

  getCongresos(){
    this.congresoSubscription = this.service
      .getAllCongresos()
      .subscribe(r => {
        this.congresos = (r.error) ? [] : r.data;
        if(this.congresos.length > 0){
          this.obtenerAnios();
        }
        this.dataSource = new MatTableDataSource(this.congresos);
      });
  }

  obtenerAnios(){
    this.aniosAll = [];
    this.aniosExist = [];
    for(let i=0; i<this.congresos.length;i++){ 
      this.aniosAll.push(this.congresos[i]['anio_con'].toString()); 
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

  trackByCongresoId(index: any, item: { id_con: any; }){
    return item.id_con;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.congresoSubscription) {
      this.congresoSubscription.unsubscribe();
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
