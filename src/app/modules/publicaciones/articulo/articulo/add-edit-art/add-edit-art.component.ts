import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-art',
  templateUrl: './add-edit-art.component.html',
  styleUrls: ['./add-edit-art.component.scss']
})
export class AddEditArtComponent implements OnInit {

  @Input() art:any;
  public articuloSubmitted!: boolean;
  public articuloForm!: FormGroup;
  public loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.articuloSubmitted = false;
    this.loading = false;
    this.articuloForm = this.formBuilder.group({
      id_art:[
        ''
      ],
      titulo_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      enlace_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(300)
        ]
      ],
      indexacion_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      desc_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      autores_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      issn_art: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

  get ar(){
    return this.articuloForm.controls;
  }

  ngOnInit(): void {
    this.loadArticulo();
  }

  loadArticulo(){
    this.articuloForm.get('id_art').setValue(this.art.id_art);
    this.articuloForm.get('titulo_art').setValue(this.art.titulo_art);
    this.articuloForm.get('enlace_art').setValue(this.art.enlace_art);
    this.articuloForm.get('indexacion_art').setValue(this.art.indexacion_art);
    this.articuloForm.get('desc_art').setValue(this.art.desc_art);
    this.articuloForm.get('autores_art').setValue(this.art.autores_art);
    this.articuloForm.get('issn_art').setValue(this.art.issn_art);
  }

  addEditArticulo(){
    this.articuloSubmitted = true;
    if (!this.articuloForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();

    formData.append('titulo_art', this.articuloForm.get('titulo_art').value);
    formData.append('enlace_art', this.articuloForm.get('enlace_art').value);
    formData.append('indexacion_art', this.articuloForm.get('indexacion_art').value);
    formData.append('desc_art', this.articuloForm.get('desc_art').value);
    formData.append('autores_art', this.articuloForm.get('autores_art').value);
    formData.append('issn_art', this.articuloForm.get('issn_art').value);

    if(this.art.id_art==0){
      this.service.addArticulo(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.articuloForm.reset();
            this.reiniciarForm(['titulo_art', 'enlace_art', 'indexacion_art', 'desc_art', 'autores_art', 'issn_art']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_art', this.articuloForm.get('id_art').value);
      this.service.updateArticulo(formData).subscribe( r =>{
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
      this.articuloForm.get(campo[i]).setValue('');  
    } 
    this.articuloSubmitted = false;
  }

  eliminarTexto(campo: string){
    this.articuloForm.get(campo).setValue('');
  }

}
