import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

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
      correo: ['Lider1@leagalite.com.com',[Validators.email]],
      contraseña: ['0987654321', [Validators.minLength(6)]]
      });
  }

  ngOnInit(): void {
  }

  iniciarSesio(){
     let dataForm = {
      correo: this.formulario.get('correo')?.value,
      contraseña: this.formulario.get('contraseña')?.value
    }

    if(dataForm.correo == "" || dataForm.contraseña == ""){

    alert('Ingrese la informacion requerida en el formulario')
    }
    if(dataForm != null){

      this.login.getLogin(dataForm.correo, dataForm.contraseña)
          .subscribe((data: any, ) => {
            //this.dialogRef.close(1);
            console.log("Ingreso ");
            console.log(data);

            const resFormat = JSON.stringify(data.usuarioResponse);
            localStorage.setItem('key',resFormat);
            this.login.user = true;
            this.router.navigate(['dashboard']);
          }, (error:any) => {
            //this.dialogRef.close(2);
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
