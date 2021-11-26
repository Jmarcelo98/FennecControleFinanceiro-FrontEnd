import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Chart from 'chart.js';
import { PainelReceita } from 'src/app/models/painelReceita';
import { PainelService } from 'src/app/services/painel.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  contactForm: FormGroup;

  anos: any;

  lineChartValorReceita: number[] = [];

  lineChartValorDespesa: number[] = [];

  anoNoChart: number

  public myChart: Chart

  anoAtual = new Date().getFullYear().toString();

  painelReceita: Array<PainelReceita> = []

  @ViewChild("painel", { static: true }) elemento: ElementRef;

  constructor(private painelService: PainelService, private fb: FormBuilder) { }

  async ngOnInit() {

    this.contactForm = this.fb.group({
      anoSelecionado: [this.anoAtual]
    })

    this.painelService.anosDashboard().subscribe(anosResultado => {
      this.anos = anosResultado
    }, err => {
      console.log(err);
    })

    await this.submit()

    await this.chart()

  }

  chart() {

    this.myChart = new Chart(this.elemento.nativeElement, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Agos", "Set", "Out", "Nov", "Dez"],
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
            data: [31, 44, 13, 552, 2343, 531, 122, 3, 441, 11, 22, 314],
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
        title: {
          display: true,
          fontSize: 35,
          text: "Resultado do balanço anual",
        }, legend: {
          labels: {
            fontSize: 20
          }
        }
      }
    });

    this.anoNoChart = this.contactForm.get('anoSelecionado')?.value
  }

  async submit() {
    this.lineChartValorReceita = []
    this.lineChartValorDespesa = []

    await this.painelService.valoresReceitaPorAno(this.contactForm.get('anoSelecionado')?.value).toPromise().then(
      a => {
        this.painelReceita = a;

        for (let i = 1; i <= 12; i++) {

          if (this.painelReceita.find(x => x.dataReceita == i)?.dataReceita == undefined) {
            this.lineChartValorReceita.push(0)
          } else {
            this.lineChartValorReceita.push(this.painelReceita.find(x => x.dataReceita == i)?.valorTotalReceita!)
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
