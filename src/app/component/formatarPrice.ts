export class FormatarPrice {

    public aplicarMascaraDinheiro(valor: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

}

