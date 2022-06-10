import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alertas } from '@data/constants';
import { IApiArchivo } from '@data/interfaces';
import { PrivateService } from '@data/services/api/private.service';
import { DisparadorService } from '@data/services/disparador/disparador.service';

@Component({
  selector: 'app-add-edit-pro',
  templateUrl: './add-edit-pro.component.html',
  styleUrls: ['./add-edit-pro.component.scss']
})
export class AddEditProComponent implements OnInit {

  @Input() pro:any;
  public proyectoSubmitted!: boolean;
  public proyectoForm!: FormGroup;
  public loading!: boolean;

  public archivosList!: IApiArchivo[];
  public subirArchivos!: boolean;

  public archivosFil!: any[];
  public loadingFil!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: PrivateService,
    private disparadorService: DisparadorService,
    private _snackBar: MatSnackBar
  ) { 
    this.archivosList = [];
    this.archivosFil = [];
    this.proyectoSubmitted = false;
    this.loading = false;
    this.loadingFil = false;
    this.subirArchivos = false;
    this.proyectoForm = this.formBuilder.group({
      id_pro:[
        ''
      ],
      titulo_pro: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      fecha_pro: [
        '', 
        [
          Validators.required
        ]
      ],
      responsable_pro: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      investigadores_pro: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
      periodo_pro: [
        '', 
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      descripcion_pro: [
        '', 
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ]
    });
  }

  get pr(){
    return this.proyectoForm.controls;
  }

  ngOnInit(): void {
    //console.log(this.pro.id_pro);
    if(this.pro.id_pro !== 0){
      this.subirArchivos = true;
      this.getArchivos(this.pro.id_pro);
    }

    this.disparadorService.deleteArchivo.subscribe(data => {
      this.loadingFil = true;
      setTimeout(() => {
        Alertas.mostrarToast(data.toString(), this._snackBar);
        this.loadingFil = false;
        this.getArchivos(this.pro.id_pro);
      }, 500);
    });

    this.loadProyecto();
  }

  getArchivos(id: any){
    this.service.getArchProList(id).subscribe(data => {
      this.archivosList = data;
      //console.log(this.archivos);
    });
  }

  loadProyecto(){
    this.proyectoForm.get('id_pro').setValue(this.pro.id_pro);
    this.proyectoForm.get('titulo_pro').setValue(this.pro.titulo_pro);
    this.proyectoForm.get('fecha_pro').setValue(this.pro.fecha_pro);
    this.proyectoForm.get('responsable_pro').setValue(this.pro.responsable_pro);
    this.proyectoForm.get('investigadores_pro').setValue(this.pro.investigadores_pro);
    this.proyectoForm.get('periodo_pro').setValue(this.pro.periodo_pro);
    this.proyectoForm.get('descripcion_pro').setValue(this.pro.descripcion_pro);
  }

  addEditProyecto(){
    this.proyectoSubmitted = true;
    if (!this.proyectoForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();

    formData.append('titulo_pro', this.proyectoForm.get('titulo_pro').value);
    formData.append('fecha_pro', this.proyectoForm.get('fecha_pro').value);
    formData.append('responsable_pro', this.proyectoForm.get('responsable_pro').value);
    formData.append('investigadores_pro', this.proyectoForm.get('investigadores_pro').value);
    formData.append('periodo_pro', this.proyectoForm.get('periodo_pro').value);
    formData.append('descripcion_pro', this.proyectoForm.get('descripcion_pro').value);

    if(this.pro.id_pro==0){
      this.service.addProyecto(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.pro.id_pro = r.data.id_pro;
            this.proyectoForm.get('id_pro').setValue(this.pro.id_pro);
            this.subirArchivos = true;
            Alertas.mostrarToast("Ya esta permitido subir archivos.", this._snackBar);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR, 'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_pro', this.proyectoForm.get('id_pro').value);
      this.service.updateProyecto(formData).subscribe( r =>{
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

  eliminarTexto(campo: string){
    this.proyectoForm.get(campo).setValue('');
  }

  abrirInputFil(){
    const fileUpload = document.getElementById('fileUploadProyecto') as HTMLInputElement;
    fileUpload.click();
  }

  onChangeFil(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivosFil.push(file);
      const formData = new FormData();
      if(this.archivosFil.length>0){
        this.loadingFil = true;
        this.archivosFil.forEach((archivo:any) => {
          formData.append('archivo_arch', archivo);
        });
        formData.append('fk_id_pro', this.pro.id_pro);
        this.service.addArchivo(formData).subscribe(r => {
          if(!r.error){
            //console.log("Archivo subido");
            setTimeout(() => {
              this.getArchivos(this.pro.id_pro);
              this.archivosFil = [];
              this.loadingFil = false;
            }, 500);

          }else{
            //console.log("Archivo no subido");
          }
        });
      }
    }
  }

}
