import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Despesa } from 'src/app/models/despesa';
import { DespesasService } from 'src/app/services/despesas.service';
import { ToastrServiceClasse } from 'src/app/services/util/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  dataMax = new Date()
  foiEnviado: boolean
  despesa: Despesa

  dataString: any
  formatadoDate: Date

  formNovaDespesa = this.formBuilder.group({
    nomeDespesa: [null, [Validators.required]],
    dataDespesa: [null, [Validators.required]],
    valorDespesa: [0, [Validators.required, Validators.min(0.01)]]
  })

  constructor(private formBuilder: FormBuilder, private despesaService: DespesasService, 
    private toastr: ToastrServiceClasse) { }

  ngOnInit(): void {
  }

  get f() {
    return this.formNovaDespesa.controls;
  }

  salvarDespesa() {

    this.foiEnviado = true;

    if (this.formNovaDespesa.invalid) {
      return;
    }

    this.dataString = this.formNovaDespesa.get('dataDespesa')?.value + environment.FORMATAR_DATA;

    const novaDespesa: Despesa = {
      id: 0,
      nomeDespesa: this.formNovaDespesa.get('nomeDespesa')?.value,
      valorDespesa: this.formNovaDespesa.get('valorDespesa')?.value,
      dataDespesa: this.formatadoDate = new Date(this.dataString),
    }

    this.despesaService.adicionarNovaReceita(novaDespesa).subscribe(sucesso => {
      this.toastr.sucessoToastr("Despesa adicionada com sucesso!")
      this.foiEnviado = false
      this.formNovaDespesa.reset();
      this.formNovaDespesa.clearValidators()
      this.formNovaDespesa.get('valorDespesa')?.setValue(0)
    }, err => {
      this.toastr.errorToastr("Erro ao adicionar a nova despesa" + err);
    })

  }

}
