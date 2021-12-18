import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ConfirmacaoDialogComponent } from 'src/app/component/confirmacao-dialog/confirmacao-dialog.component';
import { Despesa } from 'src/app/models/despesa';
import { DespesasEQuantidadeMensal } from 'src/app/models/despesasEQuantidadeMensal';
import { ControlesDeDatas } from 'src/app/models/limiteDeDatas';
import { DespesasService } from 'src/app/services/despesas.service';
import { TransferirPaginaSalvaDespesa } from 'src/app/services/util/resgatarPaginaSalvaDespesa';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { DespesaComponent } from '../despesa.component';

const USER_SCHEMA = {
  "nomeDespesa": "text",
  "valorDespesa": "number",
  "dataDespesa": "date",
  "isEdit": "isEdit"
}

const INVALIDOS_INPUT_EDITAR = {
  valor: {
    valorNull: false,
    valorZero: false
  },
  nome: false,
  data: false
}

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit {

  // serve para pegar data de despesa mais recente
  dataDespesaMaisRecente: Date

  // serve para limitar datas no input
  limiteDeDatas: ControlesDeDatas

  // usado para input de escolher um mes
  date = new FormControl(moment());

  // serve para verificar se existe alguma despesa
  despesaExiste: boolean

  // serve para verificar se existe alguma despesa cadastrada
  existeAoMenosUmaDespesaCadastrada: boolean

  // utilizado para reconhecer colunas no html
  displayedColumns: string[] = ['nomeDespesa', 'valorDespesa', 'dataDespesa', 'isEdit'];

  // utilizado para editar valores na tabela
  dataSchema: any = USER_SCHEMA;

  // utilizado para verificao de quando for enviado o input editar
  foiEnviado: boolean

  // utilizado para determinar campos invalidos ne editar
  camposInvalidos = INVALIDOS_INPUT_EDITAR;

  // utilizado pra limitar o input date
  dataLimiteInput = new Date()

  // utilizado para a configuração da paginação
  config = {
    itemsPerPage: 5,
    currentPage: this.paginaSalvaDespesa.getPagina(),
    totalItems: 0
  }

  // serve para mostrar o valor no botao
  resultaDespesaMesPesquisado: any

  // mensagens de errors vindo do backend
  responseError: any

  // utilizado para armazenar lista de despesa 
  despesas: DespesasEQuantidadeMensal

  constructor(private despesaService: DespesasService,
    private toastrServiceClasse: ToastrServiceClasse, private dialog: MatDialog,
    private despesaComponentPai: DespesaComponent, private paginaSalvaDespesa: TransferirPaginaSalvaDespesa) { }

  async ngOnInit() {

    await this.verificarSeExisteDespesaCadastrada()

    if (this.existeAoMenosUmaDespesaCadastrada == false) {

      this.date = new FormControl({ value: new Date(), disabled: true })
      this.resultaDespesaMesPesquisado = 0

    } else {

      this.foiEnviado = false

      var m = moment();
      var s = moment(this.dataDespesaMaisRecente);
      m.set(s.toObject())
      this.date.setValue(m)

      await this.buscarPelaData()
    }

  }

  async verificarSeExisteDespesaCadastrada() {

    await this.despesaService.buscarDataMaisRecenteDaDespesa().toPromise().then(data => {
      this.existeAoMenosUmaDespesaCadastrada = true
      this.limiteDeDatas = data
      // this.dataDespesaMaisRecente = data
      this.date.disabled
    }).catch(err => {
      this.existeAoMenosUmaDespesaCadastrada = false
      this.toastrServiceClasse.errorToastr(err.error.msg)
    })

  }

  buscarPelaData() {

    this.despesaService.buscarTodasDespesasOuDeAcordoComOMesAno(String(this.date.value), this.config.currentPage)?.subscribe(res => {
      this.despesas = res
      this.config.totalItems = this.despesas.qtd.quantidadeMensal!
      this.despesaExiste = true
    }, err => {
      this.responseError = err.error.msg
      this.despesaExiste = false
    })

    // this.despesaService.valorTotalDaDespesaMesAnoPesquisado(String(this.date.value)).subscribe(result => {
    //   this.resultaDespesaMesPesquisado = result
    // }, err => {
    //   this.resultaDespesaMesPesquisado = 0
    // })

  }

  desativarInputData(): boolean {

    if (this.existeAoMenosUmaDespesaCadastrada == false) {
      return true
    } else {
      return false
    }
  }

  remover(id: number) {
    this.dialog.open(ConfirmacaoDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.despesaComponentPai.processandoRequisicao = true
        this.despesaService.deletarDespesa(id).subscribe(res => {
          this.despesaComponentPai.processandoRequisicao = false
          this.toastrServiceClasse.sucessoToastr("Despesa deletada com sucesso!");
          this.buscarPelaData()
        }, err => {
          this.despesaComponentPai.processandoRequisicao = false
          this.toastrServiceClasse.errorToastr("Erro ao deletar a despesa");
          console.log(err);
        })
      }
    })
  }

  editar(despesaAtt: Despesa): boolean {

    this.foiEnviado = true

    if (despesaAtt.dataDespesa == null) {
      this.camposInvalidos.data = true
    } else {
      this.camposInvalidos.data = false
    }

    if (despesaAtt.nomeDespesa.length == 0) {
      this.camposInvalidos.nome = true
    } else {
      this.camposInvalidos.nome = false
    }

    if (despesaAtt.valorDespesa == null) {
      this.camposInvalidos.valor.valorNull = true
    } else {
      this.camposInvalidos.valor.valorNull = false
    }

    if (despesaAtt.valorDespesa == 0) {
      this.camposInvalidos.valor.valorZero = true
    } else {
      this.camposInvalidos.valor.valorZero = false
    }

    if (this.camposInvalidos.nome == true || this.camposInvalidos.data == true ||
      this.camposInvalidos.valor.valorNull == true || this.camposInvalidos.valor.valorZero) {
      return false;
    }

    this.despesaComponentPai.processandoRequisicao = true

    this.despesaService.atualizarDespesa(despesaAtt).subscribe(res => {
      this.despesaComponentPai.processandoRequisicao = false
      this.toastrServiceClasse.sucessoToastr("Despesa atualizada com sucesso");
      this.buscarPelaData()
    }, err => {
      this.despesaComponentPai.processandoRequisicao = false
      this.toastrServiceClasse.errorToastr("Erro ao atualizar a despesa");
    })
    return true
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.buscarPelaData()
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.buscarPelaData()
  }

}
