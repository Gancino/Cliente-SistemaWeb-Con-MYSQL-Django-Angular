import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from '@data/services/api/public.service';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miembros-list',
  templateUrl: './miembros-list.component.html',
  styleUrls: ['./miembros-list.component.scss']
})
export class MiembrosListComponent implements OnInit, OnDestroy {
  
  //-------------------------------------------------------------------
  public miembros: ICardUser[]; // USERS_DATA;
  public title: string;
  public miembroSubscription: Subscription;

  //public pricePesos: number;

  constructor(
    private service: PublicService
  ) { 
    this.service.setTitle('Lista de miembros');
    this.title = this.service.getTitle();

    //this.pricePesos = 0;
  }

  
  ngOnInit(): void {
    this.getMiembros();
  }

  getMiembros(){
    this.miembroSubscription = this.service
      .getAllMiembros()
      .subscribe(r => this.miembros = (r.error) ? [] : r.data);
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
