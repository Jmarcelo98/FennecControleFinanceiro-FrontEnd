import { Categorias } from "./categorias";

export interface Despesa {
    id: number;
    nomeDespesa: string;
    valorDespesa: number;
    dataDespesa: Date;
    tipoDespesaDTO: Categorias
}