import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
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

  // input do mat picker
  date = new FormControl(moment());

  // limitando data e mostrando sempre data de hj
  dataMax = new Date()

  //verificando se a data do input é igual a null
  dataInvalida = false

  // clicado em salvar receita
  foiEnviado: boolean

  // nova receita
  receita: Receita

  carregou: boolean

  dataString: any
  formatadoDate: Date

  formNovaReceita = this.formBuilder.group({
    nomeReceita: [null, [Validators.required]],
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

    console.log(this.date);


    if (this.date.value == null) {
      this.dataInvalida = true
    } else {
      this.dataInvalida = false
    }

    if (this.formNovaReceita.invalid || this.date.value._id) {
      return;
    }

    const novaReceita: Receita = {
      id: 0,
      nomeReceita: this.formNovaReceita.get('nomeReceita')?.value,
      valorReceita: this.formNovaReceita.get('valorReceita')?.value,
      dataReceita: this.date.value._d
    }

    this.receitaService.adicionarNovaReceita(novaReceita).subscribe(sucesso => {
      this.carregou = true
      this.foiEnviado = false
      this.toastr.sucessoToastr("Receita adicionada com sucesso!")
      setTimeout(() => {
        window.location.reload()
      }, 1500);

      //this.formNovaReceita.reset();
      //this.formNovaReceita.clearValidators()
      //this.formNovaReceita.get('valorReceita')?.setValue(0)
    }, err => {
      this.toastr.errorToastr("Erro ao adicionar a nova receita" + err);
    })

  }

}
