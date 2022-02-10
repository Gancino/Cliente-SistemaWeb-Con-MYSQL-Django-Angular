import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigationpublic',
  templateUrl: './navigationpublic.component.html',
  styleUrls: ['./navigationpublic.component.scss']
})
export class NavigationpublicComponent implements OnInit {

  public logo = 'assets/images/defaults/logo_negocio.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
