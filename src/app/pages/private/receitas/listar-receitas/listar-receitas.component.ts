import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from 'src/app/component/confirmacao-dialog/confirmacao-dialog.component';
import { ReceitaComponent } from '../receita.component';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { ReceitasEQuantidadeMensal } from 'src/app/models/receitasEQuantidadeMensal';
import { ControlesDeDatas } from 'src/app/models/limiteDeDatas';
import { TipoReceitaService } from 'src/app/services/tipo-receita.service';
import { Categorias } from 'src/app/models/categorias';

const USER_SCHEMA = {
  "nomeReceita": "text",
  "tipoReceitaDTO.descricao" : "submit",
  "valorReceita": "number",
  "dataReceita": "date",
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
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css'],
})


export class ListarReceitasComponent implements OnInit {

  // tipo de receitas cadastradas
  tipoReceitasCadastradas: Categorias[] = [];

  // utilizado para reconhecer colunas no html
  displayedColumns: string[] = ['nomeReceita', 'tipoReceitaDTO.descricao', 'valorReceita', 'dataReceita',  'isEdit'];

  // utilizado para editar valores na tabela
  dataSchema: any = USER_SCHEMA;

  // utilizado para determinar campos invalidos ne editar
  camposInvalidos = INVALIDOS_INPUT_EDITAR;

  // utilizado pra limitar o input date
  dataLimiteInput = new Date()

  // limitar inputs datas
  limiteDatas: ControlesDeDatas = new ControlesDeDatas()

  // utilizado para a configuração da paginação
  config = {
    itemsPerPage: 5,
    currentPage: this.paginaSalvaReceita.getPagina(),
    totalItems: 0
  }

  // utilizado para armazenar lista de receitas 
  receitas: ReceitasEQuantidadeMensal

  // utilizado para verificao de quando for enviado o input editar
  foiEnviado: boolean

  // usado para input de escolher um mes
  date = new FormControl(moment());

  // serve para verificar se existe alguma receita cadastrada
  existeAoMenosUmaReceitaCadastrada: boolean

  // serve para mostrar o valor no botao
  resultaReceitaMesPesquisado: any

  // serve para pegar data de receita mais recente
  dataReceitaMaisRecente: Date

  // serve para verificar se existe alguma receita
  receitaExiste: boolean

  // mensagens de errors vindo do backend
  responseError: any

  constructor(private receitaService: ReceitaService,
    private toastrServiceClasse: ToastrServiceClasse,
    private paginaSalvaReceita: TransferirPaginaSalvaReceita,
    private dialog: MatDialog,
    private receitaComponentPai: ReceitaComponent,
    private tipoReceitaService: TipoReceitaService) { }

  async ngOnInit() {

    await this.verificarSeExisteReceitaCadastrada()

    if (this.existeAoMenosUmaReceitaCadastrada == false) {

      this.date = new FormControl({ value: new Date(), disabled: true })
      this.resultaReceitaMesPesquisado = 0

    } else {

      this.foiEnviado = false

      var m = moment();
      var s = moment(this.dataReceitaMaisRecente);
      m.set(s.toObject())
      this.date.setValue(m)

      await this.buscarPelaData()
    }

  }

  desativarInputData(): boolean {

    if (this.existeAoMenosUmaReceitaCadastrada == false) {
      return true
    } else {
      return false
    }
  }

  async verificarSeExisteReceitaCadastrada() {

    await this.receitaService.buscarDataMaisRecenteDaReceita().toPromise().then(data => {
      this.limiteDatas = data
      this.existeAoMenosUmaReceitaCadastrada = true
      // this.dataReceitaMaisRecente = data
      this.date.disabled
    }).catch(err => {
      this.existeAoMenosUmaReceitaCadastrada = false
      this.toastrServiceClasse.errorToastr(err.error.msg)
    })

  }

  editar(receitaAtt: Receita): boolean {

    this.foiEnviado = true

    if (receitaAtt.dataReceita == null) {
      this.camposInvalidos.data = true
    } else {
      this.camposInvalidos.data = false
    }

    if (receitaAtt.nomeReceita.length == 0) {
      this.camposInvalidos.nome = true
    } else {
      this.camposInvalidos.nome = false
    }

    if (receitaAtt.valorReceita == null) {
      this.camposInvalidos.valor.valorNull = true
    } else {
      this.camposInvalidos.valor.valorNull = false
    }

    if (receitaAtt.valorReceita == 0) {
      this.camposInvalidos.valor.valorZero = true
    } else {
      this.camposInvalidos.valor.valorZero = false
    }

    if (this.camposInvalidos.nome == true || this.camposInvalidos.data == true ||
      this.camposInvalidos.valor.valorNull == true || this.camposInvalidos.valor.valorZero) {
      return false;
    }

    console.log(receitaAtt);

    
    // this.receitaComponentPai.processandoRequisicao = true

    // return true;


    this.receitaService.atualizarReceita(receitaAtt).subscribe(res => {
      this.receitaComponentPai.processandoRequisicao = false
      this.toastrServiceClasse.sucessoToastr("Receita atualizada com sucesso");
      this.buscarPelaData()
    }, err => {
      this.receitaComponentPai.processandoRequisicao = false
      this.toastrServiceClasse.errorToastr("Erro ao atualizar a receita");
    })
    return true
  }

  remover(id: number) {
    this.dialog.open(ConfirmacaoDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.receitaComponentPai.processandoRequisicao = true
        this.receitaService.deletarReceita(id).subscribe(res => {
          this.receitaComponentPai.processandoRequisicao = false
          this.toastrServiceClasse.sucessoToastr("Receita deletada com sucesso!");
          this.buscarPelaData()
        }, err => {
          this.receitaComponentPai.processandoRequisicao = false
          this.toastrServiceClasse.errorToastr("Erro ao deletar a receita");
          console.log(err);
        })
      }
    })
  }

  buscarPelaData() {

    this.receitaService.buscarTodasReceitasOuDeAcordoComOMesAno(String(this.date.value), this.config.currentPage)?.subscribe(res => {
      this.receitas = res
      this.config.totalItems = this.receitas.qtd.quantidadeMensal!
      this.receitaExiste = true
    }, err => {
      this.responseError = err.error.msg
      this.receitaExiste = false
    })

    // this.receitaService.valorTotalDaReceitaMesAnoPesquisado(String(this.date.value)).subscribe(result => {
    //   this.resultaReceitaMesPesquisado = result
    // }, err => {
    //   this.resultaReceitaMesPesquisado = 0
    // })

  }

  async buscarTipoReceita(){

    await this.tipoReceitaService.buscarTiposDeReceitas().subscribe( res => {
      console.log(res);
      this.tipoReceitasCadastradas = res;
    }, err => {
      console.log(err);
      
    })

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



