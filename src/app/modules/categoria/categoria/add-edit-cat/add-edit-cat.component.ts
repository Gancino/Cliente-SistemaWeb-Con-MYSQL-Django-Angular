import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@data/services/api/shared.service';

@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.scss']
})
export class AddEditCatComponent implements OnInit {

  @Input() cat:any;
  public categoriaSubmitted;
  public categoriaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service:SharedService,
  ) {
    this.categoriaSubmitted = false;
    this.categoriaForm = this.formBuilder.group({
      id_cat:[
        ''
      ],
      nombre_cat: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
   }

  get c(){
    return this.categoriaForm.controls;
  }

  ngOnInit(): void {
    this.categoriaForm.get('id_cat').setValue(this.cat.id_cat);
    this.categoriaForm.get('nombre_cat').setValue(this.cat.nombre_cat);
  }
  
  addEditCategoria(){
    this.categoriaSubmitted = true;
    if (!this.categoriaForm.valid)
    {
      return;
    }
    if(this.cat.id_cat==0){
      this.service.addCategoria(this.categoriaForm.value).subscribe( r => {
        alert(r.msg.toString());
      });
    }
    else{
      this.service.updateCategoria(this.categoriaForm.value).subscribe( r =>{
        alert(r.msg.toString());
      });
    }
  }
}
