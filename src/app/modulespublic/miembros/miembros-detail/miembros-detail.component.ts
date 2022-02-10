import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ROUTES } from '@data/constants/routes';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';

@Component({
  selector: 'app-miembros-detail',
  templateUrl: './miembros-detail.component.html',
  styleUrls: ['./miembros-detail.component.scss']
})
export class MiembrosDetailComponent implements OnInit{

  public miembros: ICardUser[] = [];
  public id_miem: number;
  public currentMiembro: ICardUser;
  PhotoFilePath!: String;
  public title: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.title = this.userService.getTitle();
    this.userService.getAllUsers().subscribe(r => {
      if(!r.error){
        this.miembros = r.data;
      }
    });
    //El simbolo "+" lo transforma a entero
    this.id_miem = +this.route.snapshot.params.id;
    this.currentMiembro = this.miembros.find(user => user.id_miem === this.id_miem)!;
  }

  ngOnInit(): void{
    this.userService.getUserById(this.id_miem).subscribe( r =>{
      if (!r.error){
        this.currentMiembro = r.data;
        if(this.currentMiembro.imagen_miem == '' || this.currentMiembro.imagen_miem == null ){
          this.PhotoFilePath=API_ROUTES.PhotoUrl.IMAGEN+'anonymous.png';
        }else{
          this.PhotoFilePath=API_ROUTES.PhotoUrl.MEDIA+this.currentMiembro.imagen_miem;
        }
      }
    });
  }

}

