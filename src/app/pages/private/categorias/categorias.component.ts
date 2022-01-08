import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  processandoRequisicao: boolean

  paginaACarregar: number

  activeRec = ""
  activeDes = ""

  ngOnInit(): void {
    this.paginaACarregar = 0
    this.activeRec = "active"
  }

  tipoCategoria(selecao: number) {
    
    this.paginaACarregar = selecao

    if (selecao == 0) {
      this.activeRec = "active"
    } else {
      this.activeRec = ""
    }

    if (selecao == 1) {
      this.activeDes = "active"
    } else {
      this.activeDes = ""
    }

  }

}
