import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.scss']
})
export class AddEditCatComponent implements OnInit {

  @Input() cat:any;
  public categoriaSubmitted;
  public categoriaForm: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) {
    this.categoriaSubmitted = false;
    this.loading = false;
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
    this.loading=true;
    if(this.cat.id_cat==0){
      this.service.addCategoria(this.categoriaForm.value).subscribe( r => {
        //this.mensaje(r.msg.toString());
        //alert(r.msg.toString());
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro agregado correctamente en el sistema.','success');
            this.categoriaForm.reset();
            this.eliminarTexto('nombre_cat');
          }else{
            Alertas.mostrarAlert('Error!','¡Error al agregar el registro, intentalo de nuevo!','error');
          }
        }, 500);
      });
    }else{
      this.service.updateCategoria(this.categoriaForm.value).subscribe( r =>{
        //this.mensaje(r.msg.toString());
        //alert(r.msg.toString());
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert('Buen trabajo!','Registro actualizado correctamente.','success');
          }else{
            Alertas.mostrarAlert('Error!','¡Error al actualizar el registro, intentalo de nuevo!','error');
          }
        }, 500);
      });
    }
  }

  eliminarTexto(campo: string){
    this.categoriaForm.get(campo).setValue('');
  }

}
