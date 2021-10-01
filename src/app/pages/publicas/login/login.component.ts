import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  visualizarSenha = false;

  foiEnviado = false;
  
  constructor(private formBuilder: FormBuilder, private loginService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.minLength(4)]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() {
    return this.loginForm?.controls;
  }

  mostrarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }

  login() {

    this.foiEnviado = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.get('usuario')?.value, this.loginForm.get('senha')?.value).subscribe(
      (login) => {
        this.loginService.setToken(login.token);
        this.loginService.setUsuario(login.usuario);
        this.router.navigate(['']);
      }, (err) => {
        console.log(err.error.message);
      },
    )

  }

}
