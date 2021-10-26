import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from 'src/app/models/despesa';
import { DespesasService } from 'src/app/services/despesas.service';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  dataMax = new Date()
  foiEnviado: boolean
  despesa: Despesa

  formNovaDespesa = this.formBuilder.group({
    nomeDespesa: [null, [Validators.required]],
    dataDespesa: [null, [Validators.required]],
    valorDespesa: [0, [Validators.required, Validators.min(0.01)]]
  })

  constructor(private formBuilder: FormBuilder, private despesaService: DespesasService, 
    private toastr: ToastrService) { }

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

    const novaDespesa: Despesa = {
      id: 0,
      nomeDespesa: this.formNovaDespesa.get('nomeDespesa')?.value,
      valorDespesa: this.formNovaDespesa.get('valorDespesa')?.value,
      dataDespesa: this.formNovaDespesa.get('dataDespesa')?.value,
    }

    this.despesaService.adicionarNovaReceita(novaDespesa).subscribe(sucesso => {
      this.toastr.success("Despesa adicionada com sucesso!")
      this.foiEnviado = false
      this.formNovaDespesa.reset();
      this.formNovaDespesa.clearValidators()
      this.formNovaDespesa.get('valorDespesa')?.setValue(0)
    }, err => {
      this.toastr.error("Erro ao adicionar a nova despesa" + err);
    })

  }

}
