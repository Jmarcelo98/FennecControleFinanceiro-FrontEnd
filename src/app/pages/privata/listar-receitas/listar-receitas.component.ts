import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class ListarReceitasComponent implements OnInit, AfterViewChecked {

  podeExcluir = false
  fechar: any
  setarOutraData = false

  receitaExiste: boolean
  responseError: any

  dataAtual: any

  formatar: FormatarPrice = new FormatarPrice();

  receitas: Array<Receita>

  formData: any

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
    private toastr: ToastrService, private cdr: ChangeDetectorRef) { }

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

    if (this.setarOutraData === false) {
      this.dataAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
    } else {
      this.dataAtual = (this.formData.get('data')?.value)
    }

    this.formData = this.formBuilder.group({
      data: [this.dataAtual, [Validators.required]],
    })

    this.buscarPelaData()

  }

  // setarData(date: any) {
  //  // this.setarData(new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
  //   if (this.setarOutraData == true) {
  //     console.log(date);
  //     this.dataAtual = (new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString())
  //     console.log(this.dataAtual);
  //   } else {
  //     this.dataAtual = date;
  //   }
  // }

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

        // console.log(this.formData.get('data')?.value);
        // console.log(new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString());

        if (this.formData.get('data')?.value !== new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString()) {
          this.setarOutraData = true
          //  this.setarData(this.formData.get('data')?.value)
        } else {
          this.setarOutraData = false
        }
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
