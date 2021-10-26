import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Receita } from 'src/app/models/receita';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-adicionar-receita',
  templateUrl: './adicionar-receita.component.html',
  styleUrls: ['./adicionar-receita.component.css']
})
export class AdicionarReceitaComponent implements OnInit {

  dataMax = new Date()
  foiEnviado: boolean
  receita: Receita

  formNovaReceita = this.formBuilder.group({
    nomeReceita: [null, [Validators.required]],
    dataReceita: [null, [Validators.required]],
    valorReceita: [0, [Validators.required, Validators.min(0.01)]]
  })

  constructor(private formBuilder: FormBuilder, private receitaService: ReceitaService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.formNovaReceita.controls;
  }

  salvarReceita() {

    this.foiEnviado = true;

    if (this.formNovaReceita.invalid) {
      return;
    }

    const novaReceita: Receita = {
      id: 0,
      nomeReceita: this.formNovaReceita.get('nomeReceita')?.value,
      valorReceita: this.formNovaReceita.get('valorReceita')?.value,
      dataReceita: this.formNovaReceita.get('dataReceita')?.value,
    }

    this.receitaService.adicionarNovaReceita(novaReceita).subscribe(sucesso => {
      this.toastr.success("Receita adicionada com sucesso!")
      this.foiEnviado = false
      this.formNovaReceita.reset();
      this.formNovaReceita.clearValidators()
      this.formNovaReceita.get('valorReceita')?.setValue(0)
    }, err => {
      this.toastr.error("Erro ao adicionar a nova receita" + err);
    })

  }

}
