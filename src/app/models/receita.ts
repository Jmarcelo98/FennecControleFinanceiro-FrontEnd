import { TipoReceita } from "./tipoReceita";

export interface Receita {
    id: number;
    nomeReceita: string;
    valorReceita: number;
    dataReceita: Date;
    tipoReceita: TipoReceita;
}

export const ReceitaSchema = {
    nomeReceita: "text",
    valorReceita: "number",
    dataReceita: "month",
    isEdit: "isEdit"
}