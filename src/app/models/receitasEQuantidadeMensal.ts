import { Quantidade } from "./quantidadeMensal";
import { Receita } from "./receita";

export interface ReceitasEQuantidadeMensal {
    receitaDTO: Array<Receita>
    qtd: Quantidade
}