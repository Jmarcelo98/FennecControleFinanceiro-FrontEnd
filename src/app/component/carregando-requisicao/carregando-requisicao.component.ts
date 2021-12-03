import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carregando-requisicao',
  templateUrl: './carregando-requisicao.component.html',
  styleUrls: ['./carregando-requisicao.component.css']
})
export class CarregandoRequisicaoComponent implements OnInit {

  @Input() showProgress:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
