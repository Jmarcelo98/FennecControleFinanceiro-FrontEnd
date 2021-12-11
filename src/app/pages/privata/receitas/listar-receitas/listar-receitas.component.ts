import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from 'src/app/component/confirmacao-dialog/confirmacao-dialog.component';
import { ReceitaComponent } from '../receita.component';
import { isThisTypeNode } from 'typescript';

const USER_SCHEMA = {
  "nomeReceita": "text",
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
  styleUrls: ['./listar-receitas.component.css']
})

export class ListarReceitasComponent implements OnInit, AfterViewChecked {

  // utilizado para editar valores na tabela
  dataSchema: any = USER_SCHEMA;

  // utilizado para determinar campos invalidos ne editar
  camposInvalidos = INVALIDOS_INPUT_EDITAR;

  // utilizado pra limitar o input date
  dataLimiteInput = new Date()

  // // utilizado para ativar GIF de loadig
  // requisicao: boolean

  // utilizado para a configuração da paginação
  config = {
    itemsPerPage: 5,
    currentPage: this.paginaSalvaReceita.getPagina(),
    totalItems: 0
  }

  // utilizado para formatar moeda
  formatar: FormatarPrice = new FormatarPrice();

  // utilizado para armazenar lista de receitas 
  receitas: Array<Receita>

  // utilizado para reconhecer colunas no html
  displayedColumns: string[] = ['nomeReceita', 'valorReceita', 'dataReceita', 'isEdit'];

  // utilizado para verificao de quando for enviado o input editar
  foiEnviado: boolean

  pesquisarValor: Date
  ano: number
  mes: number
  resultaReceitaMesPesquisado: any

  mesEAnoAtual: string

  setarOutraData = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any

  formData: any

  constructor(private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastrServiceClasse: ToastrServiceClasse, private cdr: ChangeDetectorRef,
    private paginaSalvaReceita: TransferirPaginaSalvaReceita, private dialog: MatDialog,
    private receitaComponentPai: ReceitaComponent) { }

  ngOnInit() {

    this.foiEnviado = false

    this.mesEAnoAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString());

    if (this.setarOutraData === false) {
      this.dataAtual = this.mesEAnoAtual;
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }

    this.formData = this.formBuilder.group({
      data: [this.dataAtual, [Validators.required]],
    })

    this.buscarPelaData()
  }

  ngAfterViewChecked() {
    if (this.setarOutraData === false) {
      this.dataAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }
    this.cdr.detectChanges();
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

    this.receitaComponentPai.processandoRequisicao = true

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

    if (this.formData.get('data').value == "") {
      this.toastrServiceClasse.errorToastr("Adicione uma data para visualizar suas receitas");
    } else {

      this.pesquisarValor = new Date(this.formData.get('data').value)

      this.ano = this.pesquisarValor.getFullYear()
      this.mes = this.pesquisarValor.getUTCMonth() + 1

      this.receitaService.quantidadeReceitaMensal(this.ano, this.mes).subscribe(quanti => {

        this.config.totalItems = quanti

      }, err => {
        console.log(err);
      })

      this.receitaService.buscarTodasReceitasOuDeAcordoComOMesAno(this.formData.get('data')?.value, this.config.currentPage)?.subscribe(res => {
        this.receitas = res
        this.receitaExiste = true
      }, err => {
        this.responseError = err.error.msg
        this.receitaExiste = false
      })


      this.receitaService.valorTotalDaReceitaMesAnoPesquisado(this.ano, this.mes).subscribe(result => {
        this.resultaReceitaMesPesquisado = result
      }, err => {
        this.resultaReceitaMesPesquisado = 0
      })
    }
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.buscarPelaData()
  }


}



