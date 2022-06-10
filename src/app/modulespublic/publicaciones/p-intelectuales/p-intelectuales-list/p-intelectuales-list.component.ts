import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiPIntelectual } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-p-intelectuales-list',
  templateUrl: './p-intelectuales-list.component.html',
  styleUrls: ['./p-intelectuales-list.component.scss']
})
export class PIntelectualesListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public pintelectuales!: IApiPIntelectual[]; // USERS_DATA;
  public title!: string;
  public pintelectualSubscription!: Subscription;
  public fecha!: string;
  public aniosAll!: string[];
  public aniosExist!: string[];

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Lista de propiedades intelectuales');
    this.title = this.service.getTitle();
  }

  ngOnInit(): void {
    this.getPIntelectuales();
  }

  getPIntelectuales(){
    this.pintelectualSubscription = this.service
      .getAllPIntelectuales()
      .subscribe(r => {
        this.pintelectuales = (r.error) ? [] : r.data;
        if(this.pintelectuales.length > 0){
          this.obtenerAnios();
        }
        this.dataSource = new MatTableDataSource(this.pintelectuales);
      });
  }

  obtenerAnios(){
    this.aniosAll = [];
    this.aniosExist = [];
    for(let i=0; i<this.pintelectuales.length;i++){
      this.fecha = this.pintelectuales[i]['fecha_pin'];
      for(let j=0; j<2; j++){
        this.fecha = this.fecha.replace('-','/'); 
      }
      let momentVariable = moment(this.fecha, 'YYYY-MM-DD');  
      this.pintelectuales[i]['anio']=momentVariable.year().toString();
      this.aniosAll.push(momentVariable.year().toString()); 
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

  trackByPIntelectualId(index: any, item: { id_pin: any; }){
    return item.id_pin;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.pintelectualSubscription) {
      this.pintelectualSubscription.unsubscribe();
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
