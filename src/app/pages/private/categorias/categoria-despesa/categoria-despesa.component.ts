import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { TipoDespesaService } from 'src/app/services/tipo-despesa.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';

const CATEGORIAS_SCHEMA = {
  "descricao": "text",
  "isEdit": "isEdit"
}

const INVALIDOS_INPUT_EDITAR = {
  nome: false
}

@Component({
  selector: 'app-categoria-despesa',
  templateUrl: './categoria-despesa.component.html',
  styleUrls: ['./categoria-despesa.component.css']
})
export class CategoriaDespesaComponent implements OnInit {

  constructor(private tipoDespesaService: TipoDespesaService,  private paginaSalvaReceita: TransferirPaginaSalvaReceita
    ) { }

   // carregando tipo de despesas
   categorias: Categorias[]

   // utilizado para reconhecer colunas no html
   displayedColumns: string[] = ['descricao', 'isEdit'];
 
   // utilizado para editar valores na tabela
   dataSchema: any = CATEGORIAS_SCHEMA;
 
   // utilizado para verificao de quando for enviado o input editar
   foiEnviado: boolean
 
   // utilizado para determinar campos invalidos ne editar
   camposInvalidos = INVALIDOS_INPUT_EDITAR;

   // utilizado para a configuração da paginação
  config = {
    itemsPerPage: 5,
    currentPage: this.paginaSalvaReceita.getPagina(),
    totalItems: 0
  }

  ngOnInit(): void {
    this.carregarTiposDespesas()
  }

  carregarTiposDespesas() {
    this.tipoDespesaService.buscarTiposDeDespesas().subscribe(res => {
      this.categorias = res
    }, err => {
      console.log(err);
    })
  }

  remover(id: number) {
    alert(id + " aqui")
  }

  editar(cat: Categorias): boolean {
    return true
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.carregarTiposDespesas()
  }

}
