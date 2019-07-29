class ListaNegociacoes{
    constructor(){
        this._negociacoes = [];
    }
    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }
    get negociacoes(){
        //Utilizando programacao defensiva, retorna um novo array, desta forma o array original não pode ser afetado
        return [].concat(this._negociacoes);
    }
}