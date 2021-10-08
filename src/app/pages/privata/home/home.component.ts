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

  carregar = false;

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario

  valorReceita: any
  valorDespesa: any
  resultado: any

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
      this.valorDespesa = err.error.msg;     
    }) 

    await this.receitaService.valorReceitaMesAtual().toPromise().then(
      responseReceita => this.valorReceita = responseReceita
      
    ).catch(err => {
      this.valorReceita = err.error.msg;
    })    

   // console.clear()

    this.resultado = this.valorReceita - this.valorDespesa

    if (isNaN(this.resultado)) {
      this.resultado = "----";
      this.colorBorder = "gray"
    } else if (this.resultado >= 0) {
      this.colorBorder = "green";
    } else {
      this.colorBorder = "red";
    }

    this.carregar = true

  }

  getFormattedPrice(valor: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

}