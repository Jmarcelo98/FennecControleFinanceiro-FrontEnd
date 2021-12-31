import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { TipoReceitaService } from 'src/app/services/tipo-receita.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';

const CATEGORIAS_SCHEMA = {
  "descricao": "text",
  "isEdit": "isEdit"
}

const INVALIDOS_INPUT_EDITAR = {
  nome: false
}

@Component({
  selector: 'app-categoria-receita',
  templateUrl: './categoria-receita.component.html',
  styleUrls: ['./categoria-receita.component.css']
})
export class CategoriaReceitaComponent implements OnInit {

  constructor(private tipoReceitaService: TipoReceitaService,  private paginaSalvaReceita: TransferirPaginaSalvaReceita,
    ) { }

  // carregando tipo de receitas
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

    this.carregarTiposReceita()

  }

  carregarTiposReceita() {
    this.tipoReceitaService.tipoReceitasPaginacao(this.config.currentPage).subscribe(res => {
      this.categorias = res
      // RECEBER NA CONSULTA QUANTIDADE DE ITENS 
      // this.config.totalItems = this.receitas.qtd.quantidadeMensal!
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
    this.carregarTiposReceita()
  }


}
