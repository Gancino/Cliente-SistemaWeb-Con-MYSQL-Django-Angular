import { Component, Input, OnInit } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.scss']
})
export class AddEditCatComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() cat:any;
  id_cat!: string;
  nombre_cat!: string;

  ngOnInit(): void {
    this.id_cat=this.cat.id_cat;
    this.nombre_cat=this.cat.nombre_cat;
  }
  
  addCategoria(){
    var val = {id_cat:this.id_cat,
                nombre_cat:this.nombre_cat};
    this.service.addCategoria(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateCategoria(){
    var val = {id_cat:this.id_cat,
                nombre_cat:this.nombre_cat};
    this.service.updateCategoria(val).subscribe(res=>{
      alert(res.toString());
    });
  }
}
