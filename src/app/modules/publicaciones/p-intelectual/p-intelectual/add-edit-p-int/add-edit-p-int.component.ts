import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-p-int',
  templateUrl: './add-edit-p-int.component.html',
  styleUrls: ['./add-edit-p-int.component.scss']
})
export class AddEditPIntComponent implements OnInit {

  @Input() pin:any;
  public pintelectualSubmitted!: boolean;
  public pintelectualForm!: FormGroup;
  public loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.pintelectualSubmitted = false;
    this.loading = false;
    this.pintelectualForm = this.formBuilder.group({
      id_pin:[
        ''
      ],
      titulo_pin: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      fecha_pin: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  get pi(){
    return this.pintelectualForm.controls;
  }

  ngOnInit(): void {
    this.pintelectualForm.get('id_pin').setValue(this.pin.id_pin);
    this.pintelectualForm.get('titulo_pin').setValue(this.pin.titulo_pin);
    this.pintelectualForm.get('fecha_pin').setValue(this.pin.fecha_pin);
  }

  addEditPIntelectual(){
    this.pintelectualSubmitted = true;
    if (!this.pintelectualForm.valid)
    {
      return;
    }
    this.loading=true;
    if(this.pin.id_pin==0){
      this.service.addPIntelectual(this.pintelectualForm.value).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.pintelectualForm.reset();
            this.reiniciarForm(['titulo_pin', 'fecha_pin']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      this.service.updatePIntelectual(this.pintelectualForm.value).subscribe( r =>{
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_EDIT_SUCCESS, 'success');
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_EDIT_ERROR, 'error');
          }
        }, 500);
      });
    }
  }

  reiniciarForm(campo: any[]){
    for (let i=0; i < campo.length; i++){
      this.pintelectualForm.get(campo[i]).setValue('');  
    } 
    this.pintelectualSubmitted = false;
  }

  eliminarTexto(campo: string){
    this.pintelectualForm.get(campo).setValue('');
  }

}
