import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TransferirPaginaSalvaDespesa {

    constructor(
    ) { }

    private pagina: number = 1

    setPagina(paginaRecebida: number) {
        this.pagina = paginaRecebida;
    }

    getPagina() {
        return this.pagina;
    }

}