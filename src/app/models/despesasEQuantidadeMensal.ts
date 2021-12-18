import { Despesa } from "./despesa";
import { Quantidade } from "./quantidadeMensal";

export interface DespesasEQuantidadeMensal {
    despesaDTO: Array<Despesa>
    qtd: Quantidade
}