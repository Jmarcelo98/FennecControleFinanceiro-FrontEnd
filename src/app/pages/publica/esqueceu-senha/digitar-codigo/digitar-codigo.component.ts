import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { RecuperarSenhaService } from 'src/app/services/recuperar-senha.service';
import { TransferirEmailParaComponenet } from 'src/app/services/util/resgatarEmail';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';

@Component({
  selector: 'app-digitar-codigo',
  templateUrl: './digitar-codigo.component.html',
  styleUrls: ['./digitar-codigo.component.css']
})

export class DigitarCodigoComponent implements OnInit, AfterViewInit {

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
    private recuperarSenhaService: RecuperarSenhaService, private toastrServiceClasse: ToastrServiceClasse,
    private router: Router) {
  }

  @ViewChild("codigo1") input: ElementRef

  email: string

  ngOnInit(): void {
    this.email = this.resgatarEmailDoComponenet.getEmail()
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus()
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
    await this.recuperarSenhaService.enviarCodigo(this.resgatarEmailDoComponenet.getEmail(), this.codigoFinal).subscribe(result => {

      this.toastrServiceClasse.sucessoToastr("Código aceito! Você será redirecionado para alterar sua senha!")
      this.router.navigate(['nova-senha']);
      this.carregou = false

    }, err => {
      this.toastrServiceClasse.errorToastr(err.error)
      this.carregou = false
    })

  }

}
