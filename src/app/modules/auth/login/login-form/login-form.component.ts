import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-login-form, [app-login-form]',//<---- [app-login-form] permite llamarlo atraves de un tag
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {

  public loginSubmitted!: boolean;
  public loginForm!: FormGroup;
  public errormensajeApi!: boolean;
  public loadingLogin!: boolean;
  public typePassword!: string;
  public clickPassword!: boolean;
  public counter: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){
    this.loginSubmitted = false;
    this.errormensajeApi = false;
    this.loadingLogin = false;
    this.typePassword='password';
    this.clickPassword=true;
    this.loginForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ]
    });
  }

  ngOnInit(): void {
    //return this.loginForm.get('username').setValue(this.authService.getUser.email)
  }

  ngOnDestroy(): void {
    clearInterval(this.counter);
  }

  get f(){
    return this.loginForm.controls;
  }

  authenticate(){
    this.loginSubmitted = true;
    this.errormensajeApi = false;
    clearInterval(this.counter);
    if (!this.loginForm.valid)
    {
      return;
    }
    this.loadingLogin = true;
    //console.log('Authenticated', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe( r => {
      //Show Errors
      //console.log(r);
      setTimeout(() => {
        this.loadingLogin = false;
        if(r.error){
          this.errormensajeApi = true;
          this.counter = setInterval(() => this.errormensajeApi = false, 10000);
        }
      }, 500);
    });
  }

  eliminarTexto(campo: string){
    this.loginForm.get(campo).setValue('');
  }

  metodotypePassword(cond:string){
    if(cond==='1'){
      this.typePassword='text';
      this.clickPassword=false;
    }else{
      this.typePassword='password';
      this.clickPassword=true;
    }
  }

}


  /**
   * 
  onSubmit() {
    this.loginSubmitted = true;
    if (!this.loginForm.valid)
    {
      return;
    }
    console.log('Authenticated', this.loginForm.value);
    this.authService.login2(this.f.username.value,this.f.password.value).pipe(first()).subscribe(
      dat => {
         console.log(dat);
       }
     )
  }

  logout() {
    this.authService.logout2();
  }
   */

  /* --------------------Trabajar con ReactiveForm (incluye mas campos)-------------------------

  public loginSubmitted;
  public loginForm;

  constructor(
    private formBuilder: FormBuilder
  ){
    this.loginSubmitted = false;
    this.loginForm = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ],
      person: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(35)]],
        lastname: ['', [Validators.required, Validators.maxLength(35)]]
      }),
      interests: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
      ])
    });
  }
  ngOnInit(): void {
    return this.loginForm.get('email').setValue('nuevo@gmail.com')
  }

 
  get fm(){
    return this.loginForm.controls;
  }
  get fp(){
    return this.loginForm.controls.person;
  }
  get interests(){
    return this.loginForm.get('interests') as FormArray;
  }

  addInterest() {
    this.interests.push(this.formBuilder.control('', [Validators.required, Validators.minLength(10)]));
  }
  deleteInterest(index: number){
    this.interests.removeAt(index);
  }
  authenticate(){
    console.log(this.loginForm.value) //---> Obtiene todos los elementos de nuestro formulario
    console.log(this.loginForm.get('password').value)//----Obtiene solo un elemento en especifico en este caso el password
    this.loginSubmitted = true;
    if (!this.loginForm.valid)
    {
      return;
    }
    console.log('Authenticated');
  }

 ----------------------------------------------------------------------------------------------------------------

  /* -------------------------------------Trabajar con ngModel--------------------------------------
  public loginForm;
  public loginSubmitted;

  constructor(){
    this.loginForm = CONST_LOGIN_PAGE.FORM;
    this.loginSubmitted = false;
  }

  get isValidForm() {
    return (this.loginForm.email.isValid() && this.loginForm.password.isValid());
  }
  authenticate(){
    if(!this.isValidForm)
    {
      this.loginSubmitted = true;
    }
    else{
      console.log('Authenticated');
    }
  }
  ----------------------------------------------------------------------------------------------*/
