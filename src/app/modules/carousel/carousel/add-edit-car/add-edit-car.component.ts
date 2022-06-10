import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from '@data/constants';
import { API_ROUTES, IMAGES_ROUTES } from '@data/constants/routes';
import { PrivateService } from '@data/services/api/private.service';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss']
})
export class AddEditCarComponent implements OnInit {

  @Input() car:any;
  public carouselSubmitted!: boolean;
  public carouselForm!: FormGroup;
  public loading!: boolean;

  public PhotoFilePath!: String;
  public archivosImg!: any[];
  public estadoImg!: string;

  public CarouselList!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private service : PrivateService
  ) { 
    this.CarouselList = [];
    this.archivosImg = [];
    this.carouselSubmitted = false;
    this.loading = false;
    this.estadoImg = 'Subir imágen';
    this.PhotoFilePath = IMAGES_ROUTES.ANONYMOUS;
    this.carouselForm = this.formBuilder.group({
      id_car:[
        ''
      ],
      titulopr_car: [
        '', 
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      titulosec_car: [
        '', 
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      subtitulo_car: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      imagen_car: [
        '', 
        [
          Validators.maxLength(300)
        ]
      ]
    });
  }

  get c(){
    return this.carouselForm.controls;
  }

  ngOnInit(): void {
    if(this.car.id_car != 0){
      this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    }
    this.loadCarousel();
  }

  loadCarousel(){
    this.carouselForm.get('id_car').setValue(this.car.id_car);
    this.carouselForm.get('titulopr_car').setValue(this.car.titulopr_car);
    this.carouselForm.get('titulosec_car').setValue(this.car.titulosec_car);
    this.carouselForm.get('subtitulo_car').setValue(this.car.subtitulo_car);
    setTimeout(() => {
      if(this.car.imagen_car == '' || this.car.imagen_car == null ){
        this.PhotoFilePath=IMAGES_ROUTES.ANONYMOUS;
        this.carouselForm.get('imagen_car').setValue('');
      }else{
        this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.car.imagen_car;
        this.carouselForm.get('imagen_car').setValue(this.car.imagen_car);
      }
    }, 100);
  }

  addEditCarousel(){
    this.carouselSubmitted = true;
    if (!this.carouselForm.valid)
    {
      return;
    }
    this.loading=true;
    const formData = new FormData();
    if(this.archivosImg.length>0){
      this.archivosImg.forEach((imagen:any) => {
        formData.append('imagen_car', imagen)
      })
    }
    
    formData.append('titulopr_car', this.carouselForm.get('titulopr_car').value);
    formData.append('titulosec_car', this.carouselForm.get('titulosec_car').value);
    formData.append('subtitulo_car', this.carouselForm.get('subtitulo_car').value);
 
    if(this.car.id_car==0){
      this.service.addCarousel(formData).subscribe( r => {
        setTimeout(() => {
          this.loading=false;
          if(!r.error){
            Alertas.mostrarAlert(Alertas.MSG_TITLE_SUCCESS, Alertas.MSG_ADD_SUCCESS, 'success');
            this.carouselForm.reset();
            this.reiniciarForm(['titulopr_car', 'titulosec_car', 'subtitulo_car']);
          }else{
            Alertas.mostrarAlert(Alertas.MSG_TITLE_ERROR, Alertas.MSG_ADD_ERROR,'error');
          }
        }, 500);
      });
    }else{
      formData.append('id_car', this.carouselForm.get('id_car').value);
      this.service.updateCarousel(formData).subscribe( r =>{
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

  onChangeImg(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.extraerBase64(file).then((imagen: any) => {
        this.PhotoFilePath = imagen.base;
      })
      this.archivosImg.push(file)
      this.estadoImg=file.name;
    }
  }

  extraerBase64 = async ( $event: any) => new Promise((resolve, reject) => {
    try{
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })

  abrirInputImg(){
    const imgUpload = document.getElementById('imgUploadCarousel') as HTMLInputElement;
    imgUpload.click();
  }

  reiniciarForm(campo: any[]){
    for (let i=0; i < campo.length; i++){
      this.carouselForm.get(campo[i]).setValue('');  
    } 
    this.PhotoFilePath=IMAGES_ROUTES.ANONYMOUS;
    this.archivosImg=[];
    this.carouselSubmitted = false;
    this.estadoImg = 'Subir imágen';
  }

  eliminarTexto(campo: string){
    this.carouselForm.get(campo).setValue('');
  }

}
