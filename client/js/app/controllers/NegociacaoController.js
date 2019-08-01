
class NegociacaoController {
    constructor() {
        //usando um "bind()" para deixar o "document.querySelector" vinculado ao "document", 
        //caso contrário, a variável criada como alias não funcionaria corretamente, pois
        //perderia o contexto  
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //o contexto de this em uma arrow function é lexical, ou seja ele não muda quando o contexto é alterado
        this._listaNegociacao = new ListaNegociacoes();

        /**OUTRA FORMA DE RESOLVER O PROBLEMA DE INSTANCIA**/

        /* let self = this;

         // aqui usei uma function tradicional, mas poderia ser uma arrow function também

         this._listaNegociacoes = new ListaNegociacoes(function(model) { 
             self._negociacoesView.update(model);
         });*/
         
        this._mensagem = new Mensagem();

        this._negociacaoView = new NegociacoesView($('#tabelaNegociacoes'));
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagemView = new MensagemView($('#mensagem'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        //console.log(this.inputData); 

        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem.texto = "Negociacão cadastrada com sucesso!";
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario(){
        //Limpa os campos do formulário
        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = '0';
        this._inputData.focus();
    }
}