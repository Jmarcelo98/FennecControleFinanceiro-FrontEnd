import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
import { Receita } from 'src/app/models/receita';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastrServiceClasse } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent implements OnInit, AfterViewChecked {

  mesEAnoAtual: string

  podeExcluir = false
  podeAlterar = false;

  fechar: any
  setarOutraData = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any
  
  receitaAtt: Receita

  idReceitaModal: number
  nomeReceitaModal: string
  valorReceitaModal: number
  dataReceitaModal: Date

  formatar: FormatarPrice = new FormatarPrice();

  receitas: Array<Receita>

  formData: any

  atualizarValores = this.formBuilder.group({
    id: [null],
    nomeNovaReceita: [null, [Validators.required]],
    valorNovaReceita: [null, [Validators.required]],
    dataReceita: [null]
  })

  confirmar = this.formBuilder.group({
    confirmacao: [null]
  })

  constructor(private autenticacaoService: AutenticacaoService, private router: Router,
    private formBuilder: FormBuilder, private receitaService: ReceitaService,
    private toastr: ToastrServiceClasse, private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    if (this.setarOutraData === false) {
      this.dataAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }
    this.cdr.detectChanges();
  }


  ngOnInit(): void {

    if (!this.autenticacaoService.estaAutenticado()) {
      this.router.navigate(['/login']);
    }

    this.mesEAnoAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString());

    if (this.setarOutraData === false) {
      this.dataAtual = this.mesEAnoAtual;
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }

    this.formData = this.formBuilder.group({
      data: [this.dataAtual, [Validators.required]],
    })

    this.buscarPelaData()

  }

  buscarPelaData() {

    if (this.formData.get('data').value == "") {
      this.toastr.errorToastr("Adicione uma data para visualizar suas receitas");

    } else {
      this.receitaService.valorReceitaData(this.formData.get('data')?.value)?.subscribe(res => {
        this.receitas = res
        this.receitaExiste = true
      }, err => {
        this.responseError = err.error.msg
        this.receitaExiste = false
      })
    }
  }

  editar(receita: Receita) {

    this.atualizarValores = this.formBuilder.group({
      id: [receita.id],
      nomeNovaReceita: [receita.nomeReceita, [Validators.required]],
      valorNovaReceita: [receita.valorReceita, [Validators.required]],
      dataReceita: [receita.dataReceita]
    })

  }

  concluirAtualizarValorReceita() {

    const novosValores: Receita = {
      id: this.atualizarValores.get('id')?.value,
      nomeReceita: this.atualizarValores.get('nomeNovaReceita')?.value,
      valorReceita: this.atualizarValores.get('valorNovaReceita')?.value,
      dataReceita: this.atualizarValores.get('dataReceita')?.value,
    }
    
     this.receitaService.atualizarReceita(novosValores).subscribe( res =>  {

      this.toastr.infoToastr("Sua receita está sendo atualizada")

      setTimeout(() => {
        this.toastr.sucessoToastr("Receita atualizada com sucesso!")
        this.ngOnInit()
      }, 2000);

     }, err => {
       this.toastr.errorToastr("Erro ao atualizar receita")
       console.log(err);
       
     })

  }


  confirmado(id: number) {
    this.podeExcluir = true
    this.excluir(id);
  }

  excluir(id: number) {
    if (this.podeExcluir === true) {
      this.receitaService.excluir(id).subscribe(res => {
        this.toastr.infoToastr("Sua receita está sendo excluida");
        if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
          this.setarOutraData = true
        } else {
          this.setarOutraData = false
        }
        setTimeout(() => {
          this.toastr.sucessoToastr("Receita removida com sucesso!");
          this.ngOnInit();
        }, 2000);

      }, err => {
        this.toastr.errorToastr("Erro ao excluir essa receita, tente mais tarde!")
      })
    }

  }

}
