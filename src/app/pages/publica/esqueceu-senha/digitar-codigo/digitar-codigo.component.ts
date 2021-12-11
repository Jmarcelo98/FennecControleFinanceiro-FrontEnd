import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TransferirEmailParaComponenet } from 'src/app/services/util/resgatarEmail';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';

@Component({
  selector: 'app-digitar-codigo',
  templateUrl: './digitar-codigo.component.html',
  styleUrls: ['./digitar-codigo.component.css']
})

export class DigitarCodigoComponent implements OnInit {

  foiEnviado = false

  codigoFinal = ""

  carregou = false

  codigo = this.formBuilder.group({
    codigo1: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    codigo2: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    codigo3: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    codigo4: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    codigo5: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    codigo6: [null, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
  })

  constructor(private formBuilder: FormBuilder, private resgatarEmailDoComponenet: TransferirEmailParaComponenet,
    private toastrServiceClasse: ToastrServiceClasse,
    private router: Router, private usuarioService: UsuarioService) {
  }

  email: string

  ngOnInit(): void {
    this.email = this.resgatarEmailDoComponenet.getEmail()
  }

  get f() {
    return this.codigo?.controls;
  }

  async enviar() {
    this.foiEnviado = true

    if (this.codigo.invalid) {
      return;
    }

    this.codigoFinal = this.codigo.get('codigo1')?.value
      + this.codigo.get('codigo2')?.value
      + this.codigo.get('codigo3')?.value
      + this.codigo.get('codigo4')?.value
      + this.codigo.get('codigo5')?.value
      + this.codigo.get('codigo6')?.value

    this.carregou = true
    await this.usuarioService.verificarCodigoEnviado(this.resgatarEmailDoComponenet.getEmail(), this.codigoFinal).subscribe(result => {

      this.toastrServiceClasse.sucessoToastr("Código aceito! Você será redirecionado para alterar sua senha!")
      this.usuarioService.setCodigoDigitado(true);
      this.router.navigate(['nova-senha']);
      this.carregou = false

    }, err => {
      if (err.status == 500) {
        this.toastrServiceClasse.errorToastr("Erro ao confirmar código. Tente novamente mais tarde")
      } else {
        this.toastrServiceClasse.errorToastr(err.error)
      }
      this.carregou = false
    })

  }

}
