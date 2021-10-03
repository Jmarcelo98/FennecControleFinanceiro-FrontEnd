import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* loginForm: FormGroup; */

  visualizarSenha = false;

  foiEnviado = false;

  existe = false;

  response = null;

  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    senha: [null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {

    if (this.autenticacaoService.estaAutenticado()) {
      this.router.navigate(['']);
    }

  }

  get f() {
    return this.loginForm?.controls;
  }

  mostrarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }

  login() {

    this.foiEnviado = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.autenticacaoService.login(this.loginForm.get('email')?.value, this.loginForm.get('senha')?.value).subscribe(
      (login) => {
        this.autenticacaoService.setToken(login.token);
        this.autenticacaoService.setUsuario(login);
        this.router.navigate(['']);
      }, (err) => {
        this.response = err.error.message;
        this.existe = true;
      },
    )

  }

}
