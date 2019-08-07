class ListaNegociacoes{
    constructor(){
        this._negociacoes = [];
        //this._armadilinha = funcao;
    }
    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //this._armadilinha();
       // Reflect.apply(this._armadilha,funcao, [this])
    }
    get negociacoes(){
        //Utilizando programacao defensiva, retorna um novo array, desta forma o array original não pode ser afetado
        return [].concat(this._negociacoes);
    }

    limpaLista(){
        this._negociacoes = [];
        //this._armadilinha();
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }
}