import { Categorias } from "./categorias";

export interface Receita {
    id: number;
    nomeReceita: string;
    valorReceita: number;
    dataReceita: Date;
    tipoReceitaDTO: Categorias;
}

export const ReceitaSchema = {
    nomeReceita: "text",
    valorReceita: "number",
    dataReceita: "month",
    isEdit: "isEdit"
}