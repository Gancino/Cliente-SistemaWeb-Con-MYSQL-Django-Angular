import { Component, OnInit } from '@angular/core';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  //Ejemplo para el for con Index
  /**
   *  public tasks: {title: string}[]=[
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
   */
  //Ejemplo para conocer el primer y ultimo indes de ngFor
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

  public style = {
    background: 'red'
  };
  public isShow = false;
  public msg ='';
  //------------------------------------------------------
  public users: ICardUser[]; // USERS_DATA;

  constructor(
    private userService: UserService
  ) { 
    this.userService.getAllUsers().subscribe(r => {
      if(!r.error){
        this.users = r.data;
      }
    });
  }
  //----------------------------------------------------------

  //Metodo que optimiza al realizar cambios (CRUD) en nuestra API
  trackByUserId(index: any, item: { id: any; }){
    return item.id;
  }
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

  ngOnInit(): void {
  }

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
}
