import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { DespesasService } from 'src/app/services/despesas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeUsuario: Usuario
  sobrenomeUsuario: Usuario

  valorDespesaAtual: number;

  colorBorder = "red";

  constructor(private autenticao: AutenticacaoService, private despesa: DespesasService) { }

  ngOnInit(): void {

    if (this.autenticao.estaAutenticado()) {

      this.nomeUsuario = this.autenticao.getNomeUsuario()
      this.sobrenomeUsuario = this.autenticao.getSobreNomeUsuario();

      this.despesa.valorDespesaMesAtual().subscribe(valor => {

        this.valorDespesaAtual = valor;

      }
        , (err) => {
          console.log(err);

          // this.response = err.error.message;
          // this.existe = true;
        })

    }

  }



}