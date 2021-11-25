import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  visualizarSenha = false

  pattern = "^[0-9]$";

  foiEnviado = false;

  jaExiste = false;

  response = null;

  cadastroForm = this.formBuilder.group({
    nome: [null, [Validators.required, Validators.minLength(3)]],
    sobrenome: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    senha: [null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(private autenticacaoService: AutenticacaoService, private cadastroService: CadastroService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.autenticacaoService.estaAutenticado()) {

      this.router.navigate(['']);

    }

  }

  get f() {
    return this.cadastroForm?.controls;
  }

  cadastro() {

    this.foiEnviado = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    this.cadastroService.cadastrar(this.cadastroForm.get('email')?.value, this.cadastroForm.get('senha')?.value,
      this.cadastroForm.get('nome')?.value, this.cadastroForm.get('sobrenome')?.value).subscribe(
        (cadastro) => {

          this.autenticacaoService.login(this.cadastroForm.get('email')?.value, this.cadastroForm.get('senha')?.value).subscribe(login => {
            this.autenticacaoService.setToken(login.token);
            this.autenticacaoService.setUsuario(login);
            this.router.navigate(['']);
          })

        }, (err) => {
          this.response = err.error.message;
          this.jaExiste = true;
        },
      )

  }

  mostrarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }

}
