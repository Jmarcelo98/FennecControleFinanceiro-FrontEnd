import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    usuario: [null, [Validators.required, Validators.minLength(4)]],
    senha: [null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {

    if(this.autenticacaoService.estaAutenticado()) {
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

    if(this.loginForm.invalid) {
      return;
    }

    this.autenticacaoService.login(this.loginForm.get('usuario')?.value, this.loginForm.get('senha')?.value).subscribe(
      (login) => {
        this.autenticacaoService.setToken(login.token);
        this.autenticacaoService.setUsuario(login.usuario);
        this.router.navigate(['']);
      }, (err) => {
        this.response = err.error.message;
        this.existe = true;
      },
    )

  }

}
