import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Despesa } from 'src/app/models/despesa';
import { DespesasService } from 'src/app/services/despesas.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { DespesaComponent } from '../despesa.component';
import { ListarDespesasComponent } from '../listar-despesas/listar-despesas.component';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  // fechar modal
  @ViewChild('closebutton') closebutton;

  // input do mat picker
  date = new FormControl(moment());

  // limitando data e mostrando sempre data de hj
  dataMax = new Date()

  //verificando se a data do input é igual a null
  dataInvalida = false

  // clicado em salvar receita
  foiEnviado: boolean

  // nova despesa
  despesa: Despesa

  formNovaDespesa = this.formBuilder.group({
    nomeDespesa: [null, [Validators.required]],
    valorDespesa: [0, [Validators.required, Validators.min(0.01)]]
  })

  constructor(private formBuilder: FormBuilder, private despesaService: DespesasService,
    private toastr: ToastrServiceClasse, private despesaComponentPai: DespesaComponent,
    private listarDespesa: ListarDespesasComponent) { }

  ngOnInit(): void {
  }

  get f() {
    return this.formNovaDespesa.controls;
  }

  salvarDespesa() {

    this.foiEnviado = true;

    if (this.date.value == null) {
      this.dataInvalida = true
    } else {
      this.dataInvalida = false
    }

    if (this.formNovaDespesa.invalid || this.date.value._id) {
      return;
    }

    this.despesaComponentPai.processandoRequisicao = true

    const novaDespesa: Despesa = {
      id: 0,
      nomeDespesa: this.formNovaDespesa.get('nomeDespesa')?.value,
      valorDespesa: this.formNovaDespesa.get('valorDespesa')?.value,
      dataDespesa: this.date.value._d
    }

    this.despesaService.adicionarNovaDespesa(novaDespesa).subscribe(sucesso => {
      // this.carregou = true
      this.foiEnviado = false
      this.toastr.sucessoToastr("Receita adicionada com sucesso!")
      this.despesaComponentPai.processandoRequisicao = false
      this.closebutton.nativeElement.click()
      this.listarDespesa.buscarPelaData()
    }, err => {
      this.toastr.errorToastr("Erro ao adicionar a nova receita" + err);
      this.despesaComponentPai.processandoRequisicao = false
    })

  }

  // salvarDespesa() {

  //   this.foiEnviado = true;

  //   if (this.formNovaDespesa.invalid) {
  //     return;
  //   }

  //   this.dataString = this.formNovaDespesa.get('dataDespesa')?.value + environment.FORMATAR_DATA;

  //   const novaDespesa: Despesa = {
  //     id: 0,
  //     nomeDespesa: this.formNovaDespesa.get('nomeDespesa')?.value,
  //     valorDespesa: this.formNovaDespesa.get('valorDespesa')?.value,
  //     dataDespesa: this.formatadoDate = new Date(this.dataString),
  //   }

  //   this.despesaService.adicionarNovaReceita(novaDespesa).subscribe(sucesso => {
  //     this.toastr.sucessoToastr("Despesa adicionada com sucesso!")
  //     this.foiEnviado = false
  //     this.formNovaDespesa.reset();
  //     this.formNovaDespesa.clearValidators()
  //     this.formNovaDespesa.get('valorDespesa')?.setValue(0)
  //   }, err => {
  //     this.toastr.errorToastr("Erro ao adicionar a nova despesa" + err);
  //   })

  // }

}
