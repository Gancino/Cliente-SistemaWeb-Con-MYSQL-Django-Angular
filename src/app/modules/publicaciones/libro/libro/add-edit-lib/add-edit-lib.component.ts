import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-lib',
  templateUrl: './add-edit-lib.component.html',
  styleUrls: ['./add-edit-lib.component.scss']
})
export class AddEditLibComponent implements OnInit {

  @Input() lib:any;
  public libroSubmitted!: boolean;
  public libroForm!: FormGroup;
  public loading!: boolean;

  public tipoLibro!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.libroSubmitted = false;
    this.loading = false;
    this.tipoLibro = [
      {
        id: "1",
        tipo: 'Libro'
      },
      {
        id: "2",
        tipo: 'Capítulo de Libro'
      }
    ];
    this.libroForm = this.formBuilder.group({
      id_lib:[
        ''
      ],
      titulo_lib: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      desc_lib: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      autores_lib: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      issn_lib: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      tipo_lib: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

  get li(){
    return this.libroForm.controls;
  }

  ngOnInit(): void {
    this.loadLibro();
  }

  loadLibro(){
    this.libroForm.get('id_lib').setValue(this.lib.id_lib);
    this.libroForm.get('titulo_lib').setValue(this.lib.titulo_lib);
    this.libroForm.get('desc_lib').setValue(this.lib.desc_lib);
    this.libroForm.get('autores_lib').setValue(this.lib.autores_lib);
    this.libroForm.get('issn_lib').setValue(this.lib.issn_lib);
    this.libroForm.get('tipo_lib').setValue(this.lib.tipo_lib);
  }

  addEditLibro(){
    this.libroSubmitted = true;
    if (!this.libroForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();

    formData.append('titulo_lib', this.libroForm.get('titulo_lib').value);
    formData.append('desc_lib', this.libroForm.get('desc_lib').value);
    formData.append('autores_lib', this.libroForm.get('autores_lib').value);
    formData.append('issn_lib', this.libroForm.get('issn_lib').value);
    formData.append('tipo_lib', this.libroForm.get('tipo_lib').value);

    if(this.lib.id_lib==0){
      this.service.addLibro(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.libroForm.reset();
            this.reiniciarForm(['titulo_lib', 'desc_lib', 'autores_lib', 'issn_lib', 'tipo_lib']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_lib', this.libroForm.get('id_lib').value);
      this.service.updateLibro(formData).subscribe( r =>{
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
      this.libroForm.get(campo[i]).setValue('');  
    } 
    this.libroSubmitted = false;
  }

  eliminarTexto(campo: string){
    this.libroForm.get(campo).setValue('');
  }

}
