import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { PainelDespesa } from 'src/app/models/painelDespesa';
import { PainelReceita } from 'src/app/models/painelReceita';
import { PainelValoresFinaisAnuais } from 'src/app/models/painelValoresFinaisAnuais';
import { PainelService } from 'src/app/services/painel.service';
import { FormatarPrice } from 'src/app/services/util/formatarPrice';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  anos: string[] = [];

  anoNoChart: number

  lineChartValorReceita: number[] = [];

  lineChartValorDespesa: number[] = [];

  painelValoresFinaisAnuais: PainelValoresFinaisAnuais = new PainelValoresFinaisAnuais();

  formatar: FormatarPrice = new FormatarPrice();

  public myChart: Chart

  contactForm = this.fb.group({
    anoSelecionado: [null]
  })

  anoAtual = new Date().getFullYear().toString();
  anoMaisRecente: string;

  painelReceita: Array<PainelReceita> = []

  painelDespesa: Array<PainelDespesa> = []

  @ViewChild("painel", { static: false }) elemento: ElementRef 

  constructor(private painelService: PainelService, private fb: FormBuilder) { }

  async ngOnInit() {

    moment.locale('pt-BR');

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
      await this.chart()
    }

    console.log(this.anos.length);
    
  }

  chart() {
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
    
    this.anoNoChart = this.contactForm.get('anoSelecionado')?.value
  }

  async submit() {

    await this.painelService.valoresFinaisAnuais(this.contactForm.get('anoSelecionado')?.value).toPromise().then(
      a => {
        this.painelValoresFinaisAnuais = a
      }
    ).catch(err => {
      console.log(err);
    })

    this.lineChartValorReceita = []
    this.lineChartValorDespesa = []

    await this.painelService.listaValoresReceitaPorAno(this.contactForm.get('anoSelecionado')?.value).toPromise().then(
      receita => {
        this.painelReceita = receita;
        for (let i = 1; i <= 12; i++) {

          if (this.painelReceita.find(x => x.dataReceita == i)?.dataReceita == undefined) {
            this.lineChartValorReceita.push(0)
          } else {
            this.lineChartValorReceita.push(this.painelReceita.find(x => x.dataReceita == i)?.valorTotalReceita!)
          }
        }
      }
    ).catch(err => {
      console.log(err);
    })

    await this.painelService.listaValoresDespesaPorAno(this.contactForm.get('anoSelecionado')?.value).toPromise().then(
      despesa => {
        this.painelDespesa = despesa;

        for (let i = 1; i <= 12; i++) {

          if (this.painelDespesa.find(x => x.dataDespesa == i)?.dataDespesa == undefined) {
            this.lineChartValorDespesa.push(0)
          } else {
            this.lineChartValorDespesa.push(this.painelDespesa.find(x => x.dataDespesa == i)?.valorTotalDespesa!)
          }
        }

        if (this.contactForm.get('anoSelecionado')?.value != this.anoNoChart) {
          this.myChart.destroy()
          this.chart()
        }

      }
    ).catch(err => {
      console.log(err);
    })

  }

}
