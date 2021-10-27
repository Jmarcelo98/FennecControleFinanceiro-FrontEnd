import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/models/despesa';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { DespesasService } from 'src/app/services/despesas.service';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit, AfterViewChecked {

  mesEAnoAtual: string

  podeExcluir = false
  podeAlterar = false;

  fechar: any
  setarOutraData = false

  despesaExiste: boolean
  responseError: any

  dataAtual: any
  
  despesaAtt: Despesa

  idDespesaModal: number
  nomeDespesaModal: string
  valorDespesaModal: number
  dataDespesaModal: Date

  formatar: FormatarPrice = new FormatarPrice();

  despesas: Array<Despesa>

  formData: any

  dataString: any
  formatadoDate: Date

  atualizarValores = this.formBuilder.group({
    id: [null],
    nomeNovaDespesa: [null, [Validators.required]],
    valorNovaDespesa: [null, [Validators.required]],
    dataDespesa: [null]
  })

  confirmar = this.formBuilder.group({
    confirmacao: [null]
  })

  constructor(private autenticacaoService: AutenticacaoService, private router: Router,
    private formBuilder: FormBuilder, private despesaService: DespesasService,
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

    // if (!this.autenticacaoService.estaAutenticado()) {
    //   this.router.navigate(['/login']);
    // }

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
      this.toastr.errorToastr("Adicione uma data para visualizar suas despesas");
    } else {
      this.despesaService.valorDespesaData(this.formData.get('data')?.value)?.subscribe(res => {      
        this.despesas = res
        this.despesaExiste = true   
        
      }, err => {
        this.responseError = err.error.msg
        this.despesaExiste = false
      })
    }
  }

  editar(despesa: Despesa) {

    this.dataDespesaModal = despesa.dataDespesa

    this.atualizarValores = this.formBuilder.group({
      id: [despesa.id],
      nomeNovaDespesa: [despesa.nomeDespesa, [Validators.required]],
      valorNovaDespesa: [despesa.valorDespesa, [Validators.required]],
      dataDespesa: [despesa.dataDespesa]
    })

  }

  concluirAtualizarValorDespesa() {

    this.dataString = this.atualizarValores.get('dataDespesa')?.value + environment.FORMATAR_DATA;

    const novosValores: Despesa = {
      id: this.atualizarValores.get('id')?.value,
      nomeDespesa: this.atualizarValores.get('nomeNovaDespesa')?.value,
      valorDespesa: this.atualizarValores.get('valorNovaDespesa')?.value,
      dataDespesa: this.formatadoDate = new Date(this.dataString),
    }
    
     this.despesaService.atualizarDespesa(novosValores).subscribe( res =>  {

      this.toastr.infoToastr("Sua despesa está sendo atualizada")

      if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
        this.setarOutraData = true
      } else {
        this.setarOutraData = false
      }


      setTimeout(() => {
        this.toastr.sucessoToastr("Despesa atualizada com sucesso!")
        this.ngOnInit()
      }, 2000);

     }, err => {
       this.toastr.errorToastr("Erro ao atualizar despesa")
       console.log(err);
       
     })

  }

  confirmado() {
    this.podeExcluir = true;
    this.excluir()
  }

  pegarIdExclusao(id: number) {
    this.idDespesaModal = id
  }


  excluir() {
    if (this.podeExcluir === true) {
      this.despesaService.excluir(this.idDespesaModal).subscribe(res => {
        this.toastr.infoToastr("Sua despesa está sendo excluida");
        if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
          this.setarOutraData = true
        } else {
          this.setarOutraData = false
        }
        setTimeout(() => {
          this.toastr.sucessoToastr("despesa removida com sucesso!");
          this.ngOnInit();
        }, 2000);

      }, err => {
        this.toastr.errorToastr("Erro ao excluir essa despesa, tente mais tarde!")
      })
    }

  }

}
