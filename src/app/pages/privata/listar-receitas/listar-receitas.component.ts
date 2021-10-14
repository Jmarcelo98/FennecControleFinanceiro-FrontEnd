import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  fechar: any

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

  constructor(private autenticacaoService: AutenticacaoService, private router: Router,
    private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastr: ToastrService) { }

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

  }

  confirmado(id: number) {
    this.podeExcluir = true
    this.excluir(id);
  }

  excluir(id: number) {
    if (this.podeExcluir === true) {
      this.receitaService.excluir(id).subscribe(res => {  
        this.sucessoToastr("Receita removida com sucesso!")
        this.ngOnInit();
      }, err => {
        console.log(err);
      })
    }

  }

  sucessoToastr(mensagem: string) {
    this.toastr.success(mensagem)
  }
}
