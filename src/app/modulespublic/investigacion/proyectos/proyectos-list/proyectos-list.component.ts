import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiProyecto } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-proyectos-list',
  templateUrl: './proyectos-list.component.html',
  styleUrls: ['./proyectos-list.component.scss']
})
export class ProyectosListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public proyectos!: IApiProyecto[]; // USERS_DATA;
  public title!: string;
  public proyectoSubscription!: Subscription;
  public fecha!: string;
  public aniosAll!: string[];
  public aniosExist!: string[];

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Proyectos de Investigación');
    this.title = this.service.getTitle();
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.proyectoSubscription = this.service
      .getAllProyectos()
      .subscribe(r => {
        this.proyectos = (r.error) ? [] : r.data;
        if(this.proyectos.length > 0){
          this.obtenerAnios();
        }
        this.dataSource = new MatTableDataSource(this.proyectos);
      });
  }

  obtenerAnios(){
    this.aniosAll = [];
    this.aniosExist = [];
    for(let i=0; i<this.proyectos.length;i++){
      this.fecha = this.proyectos[i]['fecha_pro'];
      for(let j=0; j<2; j++){
        this.fecha = this.fecha.replace('-','/'); 
      }
      let momentVariable = moment(this.fecha, 'YYYY-MM-DD');  
      this.proyectos[i]['anio']=momentVariable.year().toString();
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

  trackByProyectoId(index: any, item: { id_pro: any; }){
    return item.id_pro;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.proyectoSubscription) {
      this.proyectoSubscription.unsubscribe();
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
