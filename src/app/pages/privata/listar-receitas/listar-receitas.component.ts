import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Receita } from 'src/app/models/receita';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent implements OnInit {

  receitaExiste: boolean
  responseError : any

  formData = this.formBuilder.group({
    data: [null, [Validators.required]],
  })

  receitas: Array<Receita>

  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private formBuilder: FormBuilder, private receitaService: ReceitaService) { }

  ngOnInit(): void {

    if (!this.autenticacaoService.estaAutenticado()) {

      this.router.navigate(['/login']);

    }

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

}
