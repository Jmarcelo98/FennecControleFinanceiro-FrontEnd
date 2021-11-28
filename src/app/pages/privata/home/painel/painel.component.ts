import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Chart from 'chart.js';
import { Painel } from 'src/app/models/painel';
import { PainelValoresFinaisAnuais } from 'src/app/models/painelValoresFinaisAnuais';
import { PainelService } from 'src/app/services/painel.service';
import { ToastrServiceClasse } from 'src/app/services/toastr.service';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  carregou: boolean;

  anos: string[] = [];

  lineChartValorReceita: number[] = [];

  lineChartValorDespesa: number[] = [];

  painelValoresBotoes: PainelValoresFinaisAnuais = new PainelValoresFinaisAnuais();

  formatar: FormatarPrice = new FormatarPrice();

  public myChart: Chart

  contactForm = this.fb.group({
    anoSelecionado: [null]
  })

  painelValores: Painel

  @ViewChild("painel", { static: false }) elemento: ElementRef

  constructor(private painelService: PainelService, private fb: FormBuilder, private toastr: ToastrServiceClasse) { }



  async ngOnInit() {

    await this.painelService.anosDashboard().toPromise().then(anosResultado => {
      this.anos = anosResultado
    }).catch(err => {
      console.log(err);
    })

    if (this.anos.length > 0) {
      this.contactForm = this.fb.group({
        anoSelecionado: [this.anos[0]]
      })
      await this.submit()
    } else {
      this.toastr.infoToastr("Adicione uma receita ou despesa para visualizar o painel!")
    }

  }

  async chart() {
    
    this.myChart = new Chart(this.elemento.nativeElement, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
          {
            data: [this.lineChartValorReceita[0], this.lineChartValorReceita[1], this.lineChartValorReceita[2],
            this.lineChartValorReceita[3], this.lineChartValorReceita[4], this.lineChartValorReceita[5],
            this.lineChartValorReceita[6], this.lineChartValorReceita[7], this.lineChartValorReceita[8],
            this.lineChartValorReceita[9], this.lineChartValorReceita[10], this.lineChartValorReceita[11]],
            label: "Receitas",
            backgroundColor: 'rgba(0, 255, 0, 0.15)',
            pointBackgroundColor: 'rgba(0, 255, 0)',
            borderColor: "#00FF7F",
            pointHoverBorderColor: 'rgba(0, 255, 0, 0.7)',
            pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#fff',
            pointRadius: 5,
          },
          {
            data: [this.lineChartValorDespesa[0], this.lineChartValorDespesa[1], this.lineChartValorDespesa[2],
            this.lineChartValorDespesa[3], this.lineChartValorDespesa[4], this.lineChartValorDespesa[5],
            this.lineChartValorDespesa[6], this.lineChartValorDespesa[7], this.lineChartValorDespesa[8],
            this.lineChartValorDespesa[9], this.lineChartValorDespesa[10], this.lineChartValorDespesa[11]],
            label: "Despesas",
            backgroundColor: 'rgba(255, 0, 0, 0.15)',
            borderColor: 'rgba(255, 0, 0)',
            pointBackgroundColor: 'rgba(255, 0, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointRadius: 5,
            pointHoverBorderColor: 'rgba(255, 0, 0, 0.7)',
          }
        ],
      }, options: {
        legend: {
          labels: {
            fontSize: 20,
            boxWidth: 50,
            fontColor: "black",
          }, position: 'top',
          align: 'end',
        }, maintainAspectRatio: false
      },
    });
  }

  async submit() {

    this.lineChartValorReceita = []
    this.lineChartValorDespesa = []

    await this.painelService.painel(this.contactForm.get('anoSelecionado')?.value).toPromise().then(
      painelResultados => {
        this.painelValores = painelResultados
      }
    ).catch(err => {
      console.log(err);
    })

    for (let i = 1; i <= 12; i++) {

      if (this.painelValores.painelReceitaDTO.find(x => x.dataReceita == i)?.dataReceita == undefined) {
        this.lineChartValorReceita.push(0)
      } else {
        this.lineChartValorReceita.push(this.painelValores.painelReceitaDTO.find(x => x.dataReceita == i)?.valorTotalReceita!)
      }

      if (this.painelValores.painelDespesaDTO.find(x => x.dataDespesa == i)?.dataDespesa == undefined) {
        this.lineChartValorDespesa.push(0)
      } else {
        this.lineChartValorDespesa.push(this.painelValores.painelDespesaDTO.find(x => x.dataDespesa == i)?.valorTotalDespesa!)
      }

    }

    this.painelValoresBotoes.saldoFinalAnual = this.painelValores.painelValoresAnuaisESaldo.saldoFinalAnual
    this.painelValoresBotoes.valorAnualReceita = this.painelValores.painelValoresAnuaisESaldo.valorAnualReceita
    this.painelValoresBotoes.valorAnualDespesa = this.painelValores.painelValoresAnuaisESaldo.valorAnualDespesa

    await this.chart()
  }

  novoChart() {
    this.myChart.destroy()
    this.submit()
  }

}
