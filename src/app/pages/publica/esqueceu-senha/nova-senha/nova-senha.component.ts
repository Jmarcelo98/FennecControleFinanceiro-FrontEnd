import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { TransferirEmailParaComponenet } from 'src/app/services/util/resgatarEmail';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  novaSenha = this.formBuilder.group({
    senha: [null, [Validators.required, Validators.minLength(6)]],
    confirmarSenha: [null, [Validators.required, Validators.minLength(6)]],
  })

  visualizarSenha = false
  visualizarSenhaConfirmacao = false

  foiEnviado = false
  senhasDiferentes = false

  carregou = false

  constructor(private formBuilder: FormBuilder, private resgatarEmailDoComponenet: TransferirEmailParaComponenet,
    private autenticacaoService: AutenticacaoService, private toastrServiceClasse: ToastrServiceClasse, private router: Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.novaSenha?.controls;
  }

  mostrarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }

  mostrarSenhaConfirmacao() {
    this.visualizarSenhaConfirmacao = !this.visualizarSenhaConfirmacao;
  }

  enviar() {

    this.foiEnviado = true

    if (this.novaSenha.invalid) {
      return;
    }

    if (this.novaSenha.get('senha')?.value == this.novaSenha.get('confirmarSenha')?.value) {
      this.senhasDiferentes = false
    } else {
      this.senhasDiferentes = true
      return
    }

    this.carregou = true;

   this.autenticacaoService.atualizarSenha(this.resgatarEmailDoComponenet.getEmail(), this.novaSenha.get('senha')?.value).subscribe(result => {

      this.toastrServiceClasse.sucessoToastr("Senha alterada com sucesso!")
      this.autenticacaoService.login(this.resgatarEmailDoComponenet.getEmail(), this.novaSenha.get('senha')?.value).subscribe(login => {
        this.autenticacaoService.setToken(login.token);
        this.autenticacaoService.setUsuario(login);
        this.carregou = false
        this.router.navigate(['']);
      }, err => {
        this.toastrServiceClasse.errorToastr(err.error)
        this.carregou = false
      })

    })

  }

}
