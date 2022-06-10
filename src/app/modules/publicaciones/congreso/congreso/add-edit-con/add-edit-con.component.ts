import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-con',
  templateUrl: './add-edit-con.component.html',
  styleUrls: ['./add-edit-con.component.scss']
})
export class AddEditConComponent implements OnInit {

  @Input() con:any;
  public congresoSubmitted!: boolean;
  public congresoForm!: FormGroup;
  public loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.congresoSubmitted = false;
    this.loading = false;
    this.congresoForm = this.formBuilder.group({
      id_con:[
        ''
      ],
      titulo_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      autor_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      anio_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(4)
        ]
      ],
      numero_con: [
        '', 
        [
          Validators.required,
          Validators.maxLength(5)
        ]
      ]
    });
  }

  get co(){
    return this.congresoForm.controls;
  }

  ngOnInit(): void {
    this.loadCongreso();
  }

  loadCongreso(){
    this.congresoForm.get('id_con').setValue(this.con.id_con);
    this.congresoForm.get('titulo_con').setValue(this.con.titulo_con);
    this.congresoForm.get('autor_con').setValue(this.con.autor_con);
    this.congresoForm.get('anio_con').setValue(this.con.anio_con);
    this.congresoForm.get('numero_con').setValue(this.con.numero_con);
  }

  addEditCongreso(){
    this.congresoSubmitted = true;
    if (!this.congresoForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();

    formData.append('titulo_con', this.congresoForm.get('titulo_con').value);
    formData.append('autor_con', this.congresoForm.get('autor_con').value);
    formData.append('anio_con', this.congresoForm.get('anio_con').value);
    formData.append('numero_con', this.congresoForm.get('numero_con').value);

    if(this.con.id_con==0){
      this.service.addCongreso(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.congresoForm.reset();
            this.reiniciarForm(['titulo_con', 'autor_con', 'anio_con', 'numero_con']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_con', this.congresoForm.get('id_con').value);
      this.service.updateCongreso(formData).subscribe( r =>{
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
      this.congresoForm.get(campo[i]).setValue('');  
    } 
    this.congresoSubmitted = false;
  }

  eliminarTexto(campo: string){
    this.congresoForm.get(campo).setValue('');
  }

}
