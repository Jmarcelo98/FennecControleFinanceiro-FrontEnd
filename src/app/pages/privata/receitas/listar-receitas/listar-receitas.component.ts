import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { environment } from 'src/environments/environment';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent implements OnInit, AfterViewChecked {

  displayedColumns = ['nomeReceita', 'valorReceita', 'dataReceita', 'acoes']; // here we say that we want to just display 1 column - firstName

  requisicao: boolean

  pesquisarValor: Date
  ano: number
  mes: number
  resultaReceitaMesPesquisado: any

  config = {
    itemsPerPage: 5,
    currentPage: this.paginaSalvaReceita.getPagina(),
    totalItems: 0
  }

  mesEAnoAtual: string

  podeExcluir = false
  podeAlterar = false;

  setarOutraData = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any

  paginaAtual: any

  valorReceitaNoMesPesquisado: number

  idReceitaModal: number
  nomeReceitaModal: string
  valorReceitaModal: number
  dataReceitaModal: Date

  formatar: FormatarPrice = new FormatarPrice();

  receitas: Array<Receita>

  formData: any

  dataString: any
  formatadoDate: Date

  atualizarValores = this.formBuilder.group({
    id: [null],
    nomeNovaReceita: [null, [Validators.required]],
    valorNovaReceita: [null, [Validators.required]],
    dataReceita: [null]
  })

  confirmar = this.formBuilder.group({
    confirmacao: [null]
  })

  constructor(private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastr: ToastrServiceClasse, private cdr: ChangeDetectorRef, private paginaSalvaReceita: TransferirPaginaSalvaReceita) { }

  ngAfterViewChecked() {
    if (this.setarOutraData === false) {
      this.dataAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }
    this.cdr.detectChanges();
  }

  async ngOnInit() {

    this.requisicao = false

    this.mesEAnoAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString());

    if (this.setarOutraData === false) {
      this.dataAtual = this.mesEAnoAtual;
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }

    this.formData = this.formBuilder.group({
      data: [this.dataAtual, [Validators.required]],
    })

    // this.config = {
    //   itemsPerPage: 5,
    //   currentPage: this.paginaSalvaReceita.getPagina(),
    //   totalItems: 0
    // }

    // if (this.paginaSalvaReceita.getPagina() != 1) {
    //   this.config = {
    //     itemsPerPage: 5,
    //     currentPage: this.paginaSalvaReceita.getPagina(),
    //     totalItems: 0
    //   }

    // } else {
    //   this.config = {
    //     itemsPerPage: 5,
    //     currentPage: this.paginaSalvaReceita.getPagina(),
    //     totalItems: 0
    //   }

    // }

    this.buscarPelaData()
  }

  buscarPelaData() {

    if (this.formData.get('data').value == "") {
      this.toastr.errorToastr("Adicione uma data para visualizar suas receitas");

    } else {

      this.requisicao = true

      this.pesquisarValor = new Date(this.formData.get('data').value)

      this.ano = this.pesquisarValor.getFullYear()
      this.mes = this.pesquisarValor.getUTCMonth() + 1

      this.receitaService.quantidadeReceitas(this.ano, this.mes).subscribe(quanti => {

        this.config.totalItems = quanti

      }, err => {
        console.log(err);
      })

      this.receitaService.valorReceitaData(this.formData.get('data')?.value, this.config.currentPage)?.subscribe(res => {
        this.receitas = res
        this.receitaExiste = true
      }, err => {
        this.responseError = err.error.msg
        this.receitaExiste = false
      })


      this.receitaService.valorReceitaMesAnoPesquisado(this.ano, this.mes).subscribe(result => {
        this.resultaReceitaMesPesquisado = result
      }, err => {
        this.resultaReceitaMesPesquisado = 0
      })

      this.requisicao = false

    }
  }

  editar(receita: Receita) {
    this.dataReceitaModal = receita.dataReceita

    this.atualizarValores = this.formBuilder.group({
      id: [receita.id],
      nomeNovaReceita: [receita.nomeReceita, [Validators.required]],
      valorNovaReceita: [receita.valorReceita, [Validators.required]],
      dataReceita: [receita.dataReceita]
    })

  }

  concluirAtualizarValorReceita() {

    this.dataString = this.atualizarValores.get('dataReceita')?.value + environment.FORMATAR_DATA;

    const novosValores: Receita = {
      id: this.atualizarValores.get('id')?.value,
      nomeReceita: this.atualizarValores.get('nomeNovaReceita')?.value,
      valorReceita: this.atualizarValores.get('valorNovaReceita')?.value,
      dataReceita: this.atualizarValores.get('dataReceita')?.value,
    }

    this.receitaService.atualizarReceita(novosValores).subscribe(res => {
      this.requisicao = true
      this.toastr.infoToastr("Sua receita está sendo atualizada")
      if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
        this.setarOutraData = true
      } else {
        this.setarOutraData = false
      }

    this.paginaSalvaReceita.setPagina(this.config.currentPage)

      setTimeout(() => {
        this.toastr.sucessoToastr("Receita atualizada com sucesso!")
        this.requisicao = false
        this.ngOnInit()
      }, 500);

    }, err => {
      this.toastr.errorToastr("Erro ao atualizar receita")
      console.log(err);

    })
  }

  pegarIdExclusao(id: number) {
    this.idReceitaModal = id
  }

  confirmado() {
    this.podeExcluir = true;
    this.excluir()
  }

  excluir() {
    if (this.podeExcluir === true) {
      this.requisicao = true
      this.receitaService.excluir(this.idReceitaModal).subscribe(res => {
        this.toastr.infoToastr("Sua receita está sendo excluida");
        if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
          this.setarOutraData = true
        } else {
          this.setarOutraData = false
        }
        setTimeout(() => {
          this.toastr.sucessoToastr("Receita removida com sucesso!");
          this.requisicao = false
          this.ngOnInit();
        }, 500);

      }, err => {
        this.toastr.errorToastr("Erro ao excluir essa receita, tente mais tarde!")
      })
    }
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.buscarPelaData()
  }

}
