import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiLibro } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-libros-list',
  templateUrl: './libros-list.component.html',
  styleUrls: ['./libros-list.component.scss']
})
export class LibrosListComponent implements OnInit, OnDestroy {

  public dataSource!: MatTableDataSource<any>;
  public libros!: IApiLibro[]; // USERS_DATA;
  public title!: string;
  public libroSubscription!: Subscription;

  constructor(
    private service: PublicService,
  ) { 
    this.service.setTitle('Lista de libros');
    this.title = this.service.getTitle();
  }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(){
    this.libroSubscription = this.service
      .getAllLibros()
      .subscribe(r => {
        this.libros = (r.error) ? [] : r.data;
        this.dataSource = new MatTableDataSource(this.libros);
      });
  }

  trackByLibroId(index: any, item: { id_lib: any; }){
    return item.id_lib;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.libroSubscription) {
      this.libroSubscription.unsubscribe();
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
