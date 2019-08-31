//A classe define o que é uma negociação
//Classes com constructor só podem ser criadas com New
class Negociacao {
    constructor(data, quantidade, valor) {
        //Javascript ainda não permite alterar os modificadores de acesso,
        //por isso utilizamos como convenção o underscore para identificar itens que só podem ser acessados pela própria classe
        this._data = new Date(data.getTime());//Programação defensiva para evitar alterações na propriedade
        this._quantidade = quantidade;
        this._valor = valor;

        //Solução paliativa para mater as propriedades da classe como privadas...
        Object.freeze(this);
        //... ou quase, ele so congela as propriedades rasas da classe, não é um deep freeze,
        // se tentarmos, por exemplo, "data = this.data.setDate(12)" funcionará.
        //Resolveremos esse problema com programação defensiva
    }
    // Para não utilizarmos métodos privados, encapsulamos em getters & setters
    get volume() {
        return this._valor * this._quantidade;
    }
    get data() {
        //Aplicando programação defensiva, faremos o "get data()" apontar para outra referência
        return new Date(this._data.getTime());
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }
    
    isEqual(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}