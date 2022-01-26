import { Component, EventEmitter, Output } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { faBars, faBell, faComment, faHome, faUsers} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() showMenu = new EventEmitter<any>();
  public faBars = faBars;
  public faBell = faBell;
  public faComment = faComment;
  public faHome = faHome;
  public faUsers = faUsers;
  public avatar = 'assets/images/defaults/avatar.jpg';
  public logo = 'assets/images/defaults/logo_negocio.jpg';
  public userSubscription: Subscription;
  public PathMedia = API_ROUTES.PhotoUrl.IMAGEN
  constructor(
    public authService : AuthService
  ) { }
}
