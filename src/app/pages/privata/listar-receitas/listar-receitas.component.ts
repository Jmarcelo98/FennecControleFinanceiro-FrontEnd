import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatarPrice } from 'src/app/component/formatarPrice';
import { Receita } from 'src/app/models/receita';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent implements OnInit {

  podeExcluir = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any
  formData: any

  formatar: FormatarPrice = new FormatarPrice();

  receitas: Array<Receita>

  atualizarValores = this.formBuilder.group({
    id: [null],
    nomeReceita: [null, [Validators.required, Validators.minLength(3)]],
    valorReceita: [null, [Validators.required, Validators.minLength(3)]],
    dataReceita: [null]
  })

  confirmar = this.formBuilder.group({
    confirmacao: [null]
  })

  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private formBuilder: FormBuilder, private receitaService: ReceitaService) { }

  ngOnInit(): void {

    if (!this.autenticacaoService.estaAutenticado()) {
      this.router.navigate(['/login']);
    }

    this.dataAtual = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString();

    this.formData = this.formBuilder.group({
      data: [this.dataAtual, [Validators.required]],
    })

    this.buscarPelaData()

  }

  buscarPelaData() {

    this.receitaService.valorReceitaData(this.formData.get('data')?.value)?.subscribe(res => {
      this.receitas = res
      this.receitaExiste = true
    }, err => {
      this.responseError = err.error.msg
      this.receitaExiste = false
    })
  }

  editar(receita: Receita) {



    receita.valorReceita = this.atualizarValores.get('valorReceita')?.value;
    receita.nomeReceita = this.atualizarValores.get('nomeReceita')?.value;

    // let element;
    // for (let index = 0; index < this.receitas.length; index++) {
    //   element = this.receitas[index];
    //   element.nomeReceita = this.atualizarValores.get('nomeReceita')?.value;
    //   element.valorReceita = this.atualizarValores.get('valorReceita')?.value;
    // }
    // console.log(element);

  }

  confirmado() {
    this.podeExcluir = true
  }

  excluir(id: number) {

    if (this.podeExcluir === true) {
      this.receitaService.excluir(id).subscribe(res => {
        console.log(res);
        window.location.reload()
      }, err => {
        console.log(err);
      })
    }


  }


}
