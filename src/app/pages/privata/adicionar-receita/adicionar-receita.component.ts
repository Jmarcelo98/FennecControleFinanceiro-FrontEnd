import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adicionar-receita',
  templateUrl: './adicionar-receita.component.html',
  styleUrls: ['./adicionar-receita.component.css']
})
export class AdicionarReceitaComponent implements OnInit {

  dataMax = new Date()
  foiEnviado: boolean
  receita: Receita
  
  dataString: any
  formatadoDate: Date

  formNovaReceita = this.formBuilder.group({
    nomeReceita: [null, [Validators.required]],
    dataReceita: [null, [Validators.required]],
    valorReceita: [0, [Validators.required, Validators.min(0.01)]]
  })

  constructor(private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastr: ToastrServiceClasse) { }

  ngOnInit(): void {
  }

  get f() {
    return this.formNovaReceita.controls;
  }

  getFormatedDate(date: Date) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date);
  }

  salvarReceita() {

    this.foiEnviado = true;

    if (this.formNovaReceita.invalid) {
      return;
    }

    this.dataString = this.formNovaReceita.get('dataReceita')?.value + environment.FORMATAR_DATA;

    const novaReceita: Receita = {
      id: 0,
      nomeReceita: this.formNovaReceita.get('nomeReceita')?.value,
      valorReceita: this.formNovaReceita.get('valorReceita')?.value,
      dataReceita: this.formatadoDate = new Date(this.dataString),
    }

    this.receitaService.adicionarNovaReceita(novaReceita).subscribe(sucesso => {

      this.toastr.sucessoToastr("Receita adicionada com sucesso!")
      this.foiEnviado = false
      this.formNovaReceita.reset();
      this.formNovaReceita.clearValidators()
      this.formNovaReceita.get('valorReceita')?.setValue(0)
    }, err => {
      this.toastr.errorToastr("Erro ao adicionar a nova receita" + err);
    })

  }

}
