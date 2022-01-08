import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { ListCategoriasDespesas } from 'src/app/models/tipoDespesa';
import { ListCategorias } from 'src/app/models/tipoReceita';
import { TipoDespesaService } from 'src/app/services/tipo-despesa.service';
import { TransferirPaginaSalvaReceita } from 'src/app/services/util/resgatarPaginaSalva';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { CategoriasComponent } from '../categorias.component';

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

  constructor(private tipoDespesaService: TipoDespesaService,  private paginaSalvaReceita: TransferirPaginaSalvaReceita,
    private categoriaComponentPai: CategoriasComponent, private toastrServiceClasse: ToastrServiceClasse
    ) { }

   // carregando tipo de despesas
  categorias: ListCategoriasDespesas = new ListCategoriasDespesas()

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

  async ngOnInit() {
    await this.carregarTiposDespesas()
  }

  carregarTiposDespesas() {
    this.tipoDespesaService.tipoDespesasPaginacao(this.config.currentPage).subscribe(res => {
      this.categorias = res
      this.config.totalItems = this.categorias.quantidadeItensCategoria.qtdItens
    }, err => {
      console.log(err);
    })
  }

  remover(id: number) {
    this.categoriaComponentPai.processandoRequisicao = true

    this.tipoDespesaService.deletarTipoDespesa(id).subscribe(res => {
      this.toastrServiceClasse.sucessoToastr("Categoria removida com sucesso!")
      this.carregarTiposDespesas()
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

    this.tipoDespesaService.atualizarTipoDespesa(cat).subscribe(res => {
      this.toastrServiceClasse.sucessoToastr("Categoria de despesa atualizada com sucesso!")
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
    this.carregarTiposDespesas()
  }

}
