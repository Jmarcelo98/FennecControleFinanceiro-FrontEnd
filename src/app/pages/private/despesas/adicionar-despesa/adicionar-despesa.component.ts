import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Categorias } from 'src/app/models/categorias';
import { Despesa } from 'src/app/models/despesa';
import { DespesasService } from 'src/app/services/despesas.service';
import { TipoDespesaService } from 'src/app/services/tipo-despesa.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { DespesaComponent } from '../despesa.component';
import { ListarDespesasComponent } from '../listar-despesas/listar-despesas.component';

const INVALIDOS_INPUT_ADICIONAR = {
  tipoDespesa: false
}

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

  // clicado em salvar despesa
  foiEnviado: boolean

  // nova despesa
  despesa: Despesa

  // utilizado para determinar campos invalidos em editar
  camposInvalidos = INVALIDOS_INPUT_ADICIONAR;

  // tipo despesa
  tipoDespesa: Categorias[]

  formNovaDespesa = this.formBuilder.group({
    nomeDespesa: [null, [Validators.required]],
    valorDespesa: [0, [Validators.required, Validators.min(0.01)]],
    tipoDespesaDTO: {
      id: null,
      descricao: null
    }
  })

  constructor(private formBuilder: FormBuilder, private despesaService: DespesasService,
    private toastr: ToastrServiceClasse, private despesaComponentPai: DespesaComponent,
    private listarDespesa: ListarDespesasComponent, private tipoDespesaService: TipoDespesaService) { }

  ngOnInit(): void {

    this.tipoDespesaService.buscarTiposDeDespesas().subscribe(res => {
      this.tipoDespesa = res
    }, err => {
      console.log(err);
    })

  }

  get f() {
    return this.formNovaDespesa.controls;
  }

  salvarDespesa() {

    this.foiEnviado = true;

    let novaDespesa: Despesa = {
      id: 0,
      nomeDespesa: null!,
      valorDespesa: null!,
      dataDespesa: null!,
      tipoDespesaDTO: this.formNovaDespesa.get('tipoDespesaDTO')?.value
    }

    if (novaDespesa.tipoDespesaDTO.descricao == null && novaDespesa.tipoDespesaDTO.id == null) {
      this.camposInvalidos.tipoDespesa = true;
    } else {
      this.camposInvalidos.tipoDespesa = false;
    }

    if (this.date.value == null) {
      this.dataInvalida = true
    } else {
      this.dataInvalida = false
    }

    if (this.formNovaDespesa.invalid || this.date.value._id || this.camposInvalidos.tipoDespesa) {
      return;
    }

    novaDespesa.id = 0
    novaDespesa.dataDespesa = this.date.value._d
    novaDespesa.valorDespesa = this.formNovaDespesa.get('valorDespesa')?.value,
    novaDespesa.nomeDespesa = this.formNovaDespesa.get('nomeDespesa')?.value,

    this.despesaComponentPai.processandoRequisicao = true

    // const novaDespesa: Despesa = {
    //   id: 0,
    //   nomeDespesa: this.formNovaDespesa.get('nomeDespesa')?.value,
    //   valorDespesa: this.formNovaDespesa.get('valorDespesa')?.value,
    //   dataDespesa: this.date.value._d
    // }

    this.despesaService.adicionarNovaDespesa(novaDespesa).subscribe(sucesso => {
      this.foiEnviado = false
      this.toastr.sucessoToastr("Receita adicionada com sucesso!")
      this.despesaComponentPai.processandoRequisicao = false
      this.closebutton.nativeElement.click()
      this.formNovaDespesa.reset();
      this.listarDespesa.buscarPelaData()
    }, err => {
      this.toastr.errorToastr("Erro ao adicionar a nova receita" + err);
      this.despesaComponentPai.processandoRequisicao = false
    })

  }

}
