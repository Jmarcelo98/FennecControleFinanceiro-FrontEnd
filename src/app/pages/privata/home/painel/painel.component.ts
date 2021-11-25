import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PainelService } from 'src/app/services/painel.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  contactForm: FormGroup;

  anos: any;

  @ViewChild("painel", {static: true}) elemento: ElementRef;

  constructor(private painelService: PainelService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.painelService.anosDashboard().subscribe(anosResultado => {
      this.anos = anosResultado
    }, err => {
      console.log(err);
    })

    this.contactForm = this.fb.group({
      anoSelecionado: [null]
    })

    new Chart(this.elemento.nativeElement, {
      type: "line",
      data: {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [
          {
            data: [10, 72, 55, 423, 545, 434, 214, 12, 313, 10, 22, 141],
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
             data: [31, 44, 13, 552, 234, 531, 122, 3, 441, 11 ,22, 314],
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
          text: "Resultado final do balanço por ano",
        }, legend: {
          labels: {
            fontSize: 20
          }
        }
      }
    });

  }

  submit() {

    if (this.contactForm.get('anoSelecionado')?.value != null) {
      console.log("Form Submitted")
      console.log(this.contactForm.value)
    }

  }

}
