import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { DespesasService } from 'src/app/services/despesas.service';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario

  valorReceita: any
  valorDespesa: any
  resultado: number

  errorMessage: any

  colorBorder = "green";

  constructor(private autenticao: AutenticacaoService, private despesaService: DespesasService, private receitaService: ReceitaService) { }

  async ngOnInit() {

    if (this.autenticao.estaAutenticado()) {
      this.nomeUsuario = this.autenticao.getNomeUsuario()
      this.sobrenomeUsuario = this.autenticao.getSobreNomeUsuario();
    }

    this.valorDespesa = await this.despesaService.valorDespesaMesAtual().toPromise();
    this.valorReceita = await this.receitaService.valorReceitaMesAtual().toPromise();

    this.resultado = this.valorReceita - this.valorDespesa

    this.resultado.toString().substr(-2);

    if (this.valorReceita - this.valorDespesa >= 0) {
      this.colorBorder = "green";
    } else {
      this.colorBorder = "red";
    }

  }

  getFormattedPrice(valor: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

}