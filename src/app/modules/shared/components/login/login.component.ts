import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

export let browserRefresh = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;


  constructor(private router: Router,
              private fb: FormBuilder,
              private login: LoginServiceService) {

    this.formulario = this.fb.group({
      correo: ['victorup1902@gmail.com',[Validators.email]],
      password: ['123456890', [Validators.minLength(6)]]
      });
  }



  ngOnInit(): void {
  }

  iniciarSesio(){
     let dataForm = {
      correo: this.formulario.get('correo')?.value,
      password: this.formulario.get('password')?.value
    }

    if(dataForm.correo == "" || dataForm.password == ""){

    alert('Ingrese la informacion requerida en el formulario')
    }
    if(dataForm != null){

      this.login.getLogin(dataForm.correo, dataForm.password)
          .subscribe((data: any, ) => {

            const resFormat = JSON.stringify(data.usuarioResponse);
            this.login.setUserLS(resFormat);
            this.login.user = true;
            this.router.navigate(['dashboard']);
          }, (error:any) => {
            alert("No pudo ingresar algun dato esta incorrecto");
          })
    //this.router.navigate(['dashboard']);
    }
   /*  const respuesta = {
      id: '123456',
      user: 'victor'
    }
    const resFormat = JSON.stringify(respuesta);
    localStorage.setItem('key',resFormat);

    const answer = localStorage.getItem('key') as string;
    const conver = JSON.parse(answer);
    console.log(conver.id); */
    //this.router.navigate(['/dashboard']);
  }

}
