import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';

@Component({
  selector: 'app-digitar-email',
  templateUrl: './digitar-email.component.html',
  styleUrls: ['./digitar-email.component.css']
})
export class DigitarEmailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private autenticacaoService: AutenticacaoService, 
    private toastrServiceClasse: ToastrServiceClasse,
    private router: Router) { }

  foiEnviado = false

  digitarEmail = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })


  ngOnInit(): void {
  }

  get f() {
    return this.digitarEmail?.controls;
  }

  enviar() {

    this.foiEnviado = true

    if (this.digitarEmail.invalid) {
      return;
    }

    this.autenticacaoService.esqueciASenha(this.digitarEmail.get('email')?.value).subscribe(result => {
      
      this.toastrServiceClasse.sucessoToastr(result)

      setTimeout(() => {
        this.router.navigate(['confirmar-codigo']);
      }, 200);

    }, err => {
      this.toastrServiceClasse.errorToastr(err.error);
    })

  }

}
