import { painelGraficoDespesa } from "./painelGraficoDespesa";
import { PainelGraficoReceita } from "./painelGraficoReceita";
import { PainelValoresFinaisAnuais } from "./painelValoresFinaisAnuais";

export interface Painel {
    painelDespesaDTO: Array<painelGraficoDespesa>;
    painelReceitaDTO: Array<PainelGraficoReceita>;
    painelValoresAnuaisESaldo: PainelValoresFinaisAnuais;
}