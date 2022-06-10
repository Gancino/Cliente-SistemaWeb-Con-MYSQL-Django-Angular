import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IApiMiembro } from '@data/interfaces';
import { PublicService } from '@data/services/api/public.service';
import { DisparadorService } from '@data/services/disparador/disparador.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-miembros-list',
  templateUrl: './miembros-list.component.html',
  styleUrls: ['./miembros-list.component.scss']
})
export class MiembrosListComponent implements OnInit, OnDestroy {
  
  //-------------------------------------------------------------------
  public dataSource!: MatTableDataSource<any>;
  public miembros!: IApiMiembro[]; // USERS_DATA;
  public title!: string;
  public miembroSubscription!: Subscription;

  //public pricePesos: number;

  constructor(
    private service: PublicService,
    private disparadorService: DisparadorService
  ) { 
    this.service.setTitle('Lista de miembros');
    this.title = this.service.getTitle();
    //this.pricePesos = 0;
  }

  
  ngOnInit(): void {
    if(this.service.getFilter){
      if(this.service.getFilter.filter !== 0){
        this.getMimebrosFilter(this.service.getFilter.filter);
      }else{
        this.getMiembros();
      }
    }else{
      this.getMiembros();
    }

    this.miembroSubscription = this.disparadorService.open.subscribe(data => {
      this.miembros = data;
      this.dataSource = new MatTableDataSource(this.miembros);
    });
  }

  getMimebrosFilter(val: any){
    this.miembroSubscription = this.service
      .getMiemFilterList(val)
      .subscribe(r => {
        this.miembros = (r.error) ? [] : r.data;
        this.dataSource = new MatTableDataSource(this.miembros);
      });
  }

  getMiembros(){
    this.miembroSubscription = this.service
      .getAllMiembros()
      .subscribe(r => {
        this.miembros = (r.error) ? [] : r.data;
        this.dataSource = new MatTableDataSource(this.miembros);
      });
  }
  /*
  addAmount(){
    this.pricePesos += 10;
  }
  */
  //Metodo que optimiza al realizar cambios (CRUD) en nuestra API

  trackByMiembroId(index: any, item: { id_miem: any; }){
    return item.id_miem;
  }

  ngOnDestroy(): void {
    this.service.clearTitle();
    if(this.miembroSubscription) {
      //console.log('unsubscribe');
      this.miembroSubscription.unsubscribe();
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
  //--------------------------------------------------------------------



  /**
    ---------------------Ejemplo para el for con Index------------------
    public tasks: {title: string}[]=[
      {
        title: 'Lavar trastes'
      },
      {
        title: 'Estudiar'
      },
      {
        title: 'Pasear al perro'
      }
    ]
    ---------------------------------------------------------------------
  */

  /**
    ---------------Ejemplo para conocer el primer y ultimo index de ngFor-----------
    public options = [
      'un',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'doce',
      'veinte',
      'ningun',
    ]
    ---------------------------------------------------------------------------------
  */
  
  /**
   * 
    --------------------Trabajar con mensajes de error y success---------------------
    public style = {
      background: 'red'
    };
    public isShow = false;
    public msg ='';
    showError(){
      this.style.background = 'red';
      this.msg = '* Hubo un error!';
      this.isShow = true;
    }
    showSuccess(){
      this.style.background = 'green';
      this.msg = '* El envio fu exitoso';
      this.isShow = true;
    }
    ---------------------------------------------------------------------------------
  */

  /**
    ---------------Funcion que simula agregar un nuevo usuario------------------
    newUser(){
      this.users.push({
        id: 23,
        age: 30,
        avatar: 'https://www.esneca.com/wp-content/uploads/cuanto-gana-un-consultor-sap.jpg',
        description: 'Soy trabajador',
        name: 'Orlando',
        gender: 'M',
        work: 'Consultor'
      });
    }
    -----------------------------------------------------------------------------
  */
}
