import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { ListCategorias } from 'src/app/models/tipoReceita';
import { TipoReceitaService } from 'src/app/services/tipo-receita.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { CategoriasComponent } from '../categorias.component';

const CATEGORIAS_SCHEMA = {
  "descricao": "text",
  "isEdit": "isEdit"
}

const INVALIDOS_INPUT_EDITAR = {
  nome: false,
  categoriaExiste: false,
}

@Component({
  selector: 'app-categoria-receita',
  templateUrl: './categoria-receita.component.html',
  styleUrls: ['./categoria-receita.component.css']
})
export class CategoriaReceitaComponent implements OnInit {

  constructor(private tipoReceitaService: TipoReceitaService,
    private paginaSalvaReceita: TransferirPaginaSalvaReceita,
    private toastrServiceClasse: ToastrServiceClasse,
    private categoriaComponentPai: CategoriasComponent) { }

  // carregando tipo de receitas
  categorias: ListCategorias = new ListCategorias()

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

  // 
  naoExiste: boolean

  async ngOnInit() {

    await this.carregarTiposReceita()

  }

  carregarTiposReceita() {
    this.tipoReceitaService.tipoReceitasPaginacao(this.config.currentPage).subscribe(res => {
      this.categorias = res
      this.config.totalItems = this.categorias.quantidadeItensCategoria.qtdItens
    }, err => {
      console.log(err);
    })
  }

  remover(id: number) {
    this.categoriaComponentPai.processandoRequisicao = true

    this.tipoReceitaService.deletarTipoReceita(id).subscribe(res => {
      this.toastrServiceClasse.sucessoToastr("Categoria removida com sucesso!")
      this.carregarTiposReceita()
    }, err => {
      this.toastrServiceClasse.errorToastr(err.error.msg)
    })
    this.categoriaComponentPai.processandoRequisicao = false
  }

  editar(cat: Categorias): boolean {

    this.foiEnviado = true

    if (cat.descricao.trim().length == 0) {
      this.camposInvalidos.nome = true
      return false;
    } else {
      this.camposInvalidos.nome = false
    }

    this.categoriaComponentPai.processandoRequisicao = true

    this.tipoReceitaService.atualizarTipoReceita(cat).subscribe(res => {
      this.toastrServiceClasse.sucessoToastr("Categoria de receita atualizada com sucesso!")
    }, err => {
      if (err.status == 400) {
        this.toastrServiceClasse.errorToastr(err.error);
      }
    })

    this.categoriaComponentPai.processandoRequisicao = false
    return true;
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.carregarTiposReceita()
  }

}
