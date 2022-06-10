import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiArticulo } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.scss']
})
export class ArticulosListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public articulos!: IApiArticulo[]; // USERS_DATA;
  public title!: string;
  public articuloSubscription!: Subscription;

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Lista de artículos');
  }

  ngOnInit(): void {
    this.getArticulos();
    this.title = this.service.getTitle();
  }

  getArticulos(){
    this.articuloSubscription = this.service
      .getAllArticulos()
      .subscribe(r => {
        this.articulos = (r.error) ? [] : r.data;
        this.dataSource = new MatTableDataSource(this.articulos);
      });
  }

  trackByArticuloId(index: any, item: { id_art: any; }){
    return item.id_art;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.articuloSubscription) {
      this.articuloSubscription.unsubscribe();
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
