import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TransferirEmailParaComponenet } from 'src/app/services/util/resgatarEmail';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';

@Component({
  selector: 'app-digitar-email',
  templateUrl: './digitar-email.component.html',
  styleUrls: ['./digitar-email.component.css']
})
export class DigitarEmailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastrServiceClasse: ToastrServiceClasse,
    private router: Router, private transferirEmailParaComponenet: TransferirEmailParaComponenet,
    private usuarioService: UsuarioService) { }

  foiEnviado = false
  carregou = false

  digitarEmail = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })


  ngOnInit(): void {
  }

  get f() {
    return this.digitarEmail?.controls;
  }

  async enviar() {

    this.foiEnviado = true

    if (this.digitarEmail.invalid) {
      return;
    }

    this.carregou = true
    await this.usuarioService.enviarCodigoEmail(this.digitarEmail.get('email')?.value).toPromise().then(result => {
      result = "Código enviado ao email informado";
      this.transferirEmailParaComponenet.setEmail(this.digitarEmail.get('email')?.value)
      this.usuarioService.setEmailDigitado(true)
      this.toastrServiceClasse.sucessoToastr(result)
      this.router.navigate(['digitar-codigo'])
      this.carregou = false

    }).catch(err => {
      this.toastrServiceClasse.errorToastr(err.error);
      this.carregou = false
    })

  }

}
