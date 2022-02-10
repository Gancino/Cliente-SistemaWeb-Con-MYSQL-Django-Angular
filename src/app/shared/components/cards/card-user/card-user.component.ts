import { Component, Input, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { ICardUser } from './icard-user.metadata';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @Input() data!: ICardUser;
  PhotoFilePath!: String;
  constructor() { 
  }

  ngOnInit(): void {
    if(this.data.imagen_miem == '' || this.data.imagen_miem == null ){
      this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+'anonymous.png';
    }else{
      this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.data.imagen_miem;
    }
  }

}
