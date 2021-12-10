import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from 'src/app/component/confirmacao-dialog/confirmacao-dialog.component';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

const USER_SCHEMA = {
  "nomeReceita": "text",
  "valorReceita": "number",
  "dataReceita": "date",
  "isEdit": "isEdit"
}


@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})


export class ListarReceitasComponent implements OnInit, AfterViewChecked {

  dataLimiteInput = new Date()

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

  setarOutraData = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any

  formatar: FormatarPrice = new FormatarPrice();

  receitas: Array<Receita>

  formData: any

  displayedColumns: string[] = ['nomeReceita', 'valorReceita', 'dataReceita', 'isEdit'];

  dataSchema: any = USER_SCHEMA;

  editarInvalido = false

  camposInvalidos = {
    valor: {
      valorNull: false,
      valorZero: false
    },
    nome: false,
    data: false
  }

  teste: any

  foiEnviado: boolean

  constructor(private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastr: ToastrServiceClasse, private cdr: ChangeDetectorRef,
    private paginaSalvaReceita: TransferirPaginaSalvaReceita, private dialog: MatDialog) { }



  async ngOnInit() {

    this.foiEnviado = false
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

  editar(receitaAtt: Receita) {

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
      return;
    }

    console.log(receitaAtt.dataReceita);


    return;

    this.receitaService.atualizarReceita(receitaAtt).subscribe(res => {
    }, err => {
      console.log(err);
    })
  }

  remover(id: number) {
    this.dialog.open(ConfirmacaoDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.receitaService.deletarReceita(id).subscribe(res => {
          console.log("excluiu");
        }, err => {
          console.log(err);
        })
      }
    })
  }

  buscarPelaData() {

    if (this.formData.get('data').value == "") {
      this.toastr.errorToastr("Adicione uma data para visualizar suas receitas");

    } else {

      this.requisicao = true

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
        console.log(this.receitas);
                
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

      this.requisicao = false

    }
  }

  // editar(receita: Receita) {

  //   this.dataReceitaModal = receita.dataReceita

  //   this.atualizarValores = this.formBuilder.group({
  //     id: [receita.id],
  //     nomeNovaReceita: [receita.nomeReceita, [Validators.required]],
  //     valorNovaReceita: [receita.valorReceita, [Validators.required]],
  //     dataReceita: [receita.dataReceita]
  //   })

  // }

  // concluirAtualizarValorReceita() {

  //   this.dataString = this.atualizarValores.get('dataReceita')?.value + environment.FORMATAR_DATA;

  //   const novosValores: Receita = {
  //     id: this.atualizarValores.get('id')?.value,
  //     nomeReceita: this.atualizarValores.get('nomeNovaReceita')?.value,
  //     valorReceita: this.atualizarValores.get('valorNovaReceita')?.value,
  //     dataReceita: this.atualizarValores.get('dataReceita')?.value,
  //   }

  //   this.receitaService.atualizarReceita(novosValores).subscribe(res => {
  //     this.requisicao = true
  //     this.toastr.infoToastr("Sua receita está sendo atualizada")
  //     if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
  //       this.setarOutraData = true
  //     } else {
  //       this.setarOutraData = false
  //     }

  //     this.paginaSalvaReceita.setPagina(this.config.currentPage)

  //     setTimeout(() => {
  //       this.toastr.sucessoToastr("Receita atualizada com sucesso!")
  //       this.requisicao = false
  //       this.ngOnInit()
  //     }, 500);

  //   }, err => {
  //     this.toastr.errorToastr("Erro ao atualizar receita")
  //     console.log(err);

  //   })
  // }

  // pegarIdExclusao(id: number) {
  //   this.idReceitaModal = id
  // }

  // confirmado() {
  //   this.podeExcluir = true;
  //   this.excluir()
  // }

  // excluir() {
  //   if (this.podeExcluir === true) {
  //     this.requisicao = true
  //     this.receitaService.deletarReceita(this.idReceitaModal).subscribe(res => {
  //       this.toastr.infoToastr("Sua receita está sendo excluida");
  //       if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
  //         this.setarOutraData = true
  //       } else {
  //         this.setarOutraData = false
  //       }
  //       setTimeout(() => {
  //         this.toastr.sucessoToastr("Receita removida com sucesso!");
  //         this.requisicao = false
  //         this.ngOnInit();
  //       }, 500);

  //     }, err => {
  //       this.toastr.errorToastr("Erro ao excluir essa receita, tente mais tarde!")
  //     })
  //   }
  // }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.buscarPelaData()
  }


}



