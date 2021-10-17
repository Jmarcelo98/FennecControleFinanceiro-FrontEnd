import { Component, OnInit } from '@angular/core';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
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

  carregar = false;

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario

  valorReceita: any
  valorDespesa: any
  resultado: any

  formatar: FormatarPrice = new FormatarPrice();

  colorBorder = "green";

  constructor(private autenticao: AutenticacaoService, private despesaService: DespesasService, private receitaService: ReceitaService) { }

  async ngOnInit() {

    if (this.autenticao.estaAutenticado()) {
      this.nomeUsuario = this.autenticao.getNomeUsuario()
      this.sobrenomeUsuario = this.autenticao.getSobreNomeUsuario();
    }

    await this.despesaService.valorDespesaMesAtual().toPromise().then(
      responseDespesa => this.valorDespesa = responseDespesa
    ).catch(err => {
      this.valorDespesa = err.error;
    })

    await this.receitaService.valorReceitaMesAtual().toPromise().then(
      responseReceita => this.valorReceita = responseReceita
    ).catch(err => {
      this.valorReceita = err.error;

    })


    if (typeof (this.valorReceita) === 'string' && typeof (this.valorDespesa) == 'string') {
      this.valorReceita = 0.0;
      this.valorDespesa = 0.0;
    } else if (typeof (this.valorReceita) == 'string') {
      this.valorReceita = 0.0
    } else if (typeof (this.valorDespesa) == 'string') {
      this.valorDespesa = 0.0
    }

    this.resultado = this.valorReceita - this.valorDespesa

    if (this.resultado > 0) {
      this.colorBorder = "green"
    } else if (this.resultado < 0) {
      this.colorBorder = "red"
    } else {
      this.colorBorder = "gray"
    }

    this.carregar = true
  }

  // getFormattedPrice(valor: number) {
  //   return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  // }

}