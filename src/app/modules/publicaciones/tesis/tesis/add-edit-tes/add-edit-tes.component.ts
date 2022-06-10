import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-tes',
  templateUrl: './add-edit-tes.component.html',
  styleUrls: ['./add-edit-tes.component.scss']
})
export class AddEditTesComponent implements OnInit {

  @Input() tes:any;
  public tesisSubmitted!: boolean;
  public tesisForm!: FormGroup;
  public loading!: boolean;

  public tipoTesis!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.tesisSubmitted = false;
    this.loading = false;
    this.tipoTesis = [
      {
        id: "1",
        tipo: 'Pregrado'
      },
      {
        id: "2",
        tipo: 'Posgrado'
      },
      {
        id: "3",
        tipo: 'Doctorado'
      }
    ];
    this.tesisForm = this.formBuilder.group({
      id_tes:[
        ''
      ],
      titulo_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      anio_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(4)
        ]
      ],
      directores_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      autores_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      universidad_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      tipo_tes: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

  get te(){
    return this.tesisForm.controls;
  }

  ngOnInit(): void {
    this.loadTesis();
  }

  loadTesis(){
    this.tesisForm.get('id_tes').setValue(this.tes.id_tes);
    this.tesisForm.get('titulo_tes').setValue(this.tes.titulo_tes);
    this.tesisForm.get('anio_tes').setValue(this.tes.anio_tes);
    this.tesisForm.get('directores_tes').setValue(this.tes.directores_tes);
    this.tesisForm.get('autores_tes').setValue(this.tes.autores_tes);
    this.tesisForm.get('universidad_tes').setValue(this.tes.universidad_tes);
    this.tesisForm.get('tipo_tes').setValue(this.tes.tipo_tes);
  }

  addEditTesis(){
    this.tesisSubmitted = true;
    if (!this.tesisForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();

    formData.append('titulo_tes', this.tesisForm.get('titulo_tes').value);
    formData.append('anio_tes', this.tesisForm.get('anio_tes').value);
    formData.append('directores_tes', this.tesisForm.get('directores_tes').value);
    formData.append('autores_tes', this.tesisForm.get('autores_tes').value);
    formData.append('universidad_tes', this.tesisForm.get('universidad_tes').value);
    formData.append('tipo_tes', this.tesisForm.get('tipo_tes').value);

    if(this.tes.id_tes==0){
      this.service.addTesis(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.tesisForm.reset();
            this.reiniciarForm(['titulo_tes', 'anio_tes', 'directores_tes', 'autores_tes', 'universidad_tes', 'tipo_tes']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_tes', this.tesisForm.get('id_tes').value);
      this.service.updateTesis(formData).subscribe( r =>{
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
      this.tesisForm.get(campo[i]).setValue('');  
    } 
    this.tesisSubmitted = false;
  }

  eliminarTexto(campo: string){
    this.tesisForm.get(campo).setValue('');
  }

}
