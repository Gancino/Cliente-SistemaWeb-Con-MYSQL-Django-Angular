import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USERS_DATA } from '@data/constants/users.const';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  public users: ICardUser[] = [];
  public id: number;
  public currentUser: ICardUser;

  public title: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.title = this.userService.getTitle();
    this.userService.getAllUsers().subscribe(r => {
      if(!r.error){
        this.users = r.data;
      }
    });
    //El simbolo "+" lo transforma a entero
    this.id = +this.route.snapshot.params.id;
    this.currentUser = this.users.find(user => user.id === this.id)!;
  }

  ngOnInit(){
    this.userService.getUserById(this.id).subscribe( r =>{
      if (!r.error){
        this.currentUser = r.data;
      }
    });
  }

}
