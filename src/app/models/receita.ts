export interface Receita {
    id: number;
    nomeReceita: string;
    valorReceita: number;
    dataReceita: Date;
}

export const ReceitaSchema = {
    nomeReceita: "text",
    valorReceita: "number",
    dataReceita: "month",
    isEdit: "isEdit"
}