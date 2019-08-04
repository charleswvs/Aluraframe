class NegociacaoController {
    constructor() {
        //usando um "bind()" para deixar o "document.querySelector" vinculado ao "document", 
        //caso contrário, a variável criada como alias não funcionaria corretamente, pois
        //perderia o contexto  
        let $ = document.querySelector.bind(document);
        let self = this;

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //o contexto de this em uma arrow function é lexical, ou seja ele não muda quando o contexto é alterado
        // this._listaNegociacao = new ListaNegociacoes( () =>
        //     this._negociacaoView.update(this._listaNegociacao)
        // );
        //Esta forma ainda não é a melhor pois ela deixa muito código de infraestrutura no modelo

        /**OUTRA FORMA DE RESOLVER O PROBLEMA DE INSTANCIA**/

        /* let self = this;

         // aqui usei uma function tradicional, mas poderia ser uma arrow function também

         this._listaNegociacoes = new ListaNegociacoes(function(model) { 
             self._negociacoesView.update(model);
         });*/

        //Resolveremos usamos proxy então:

        this._listaNegociacao = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                //PRESTAR MUITA ATENÇÃO AO DECLARAR O TYPEOF, já que tem que colocar o target[prop]
                if (['adiciona', 'limpaLista'].includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacaoView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });


        this._mensagem = new Mensagem();

        this._negociacaoView = new NegociacoesView($('#tabelaNegociacoes'));
        this._negociacaoView.update(this._listaNegociacao)

        this._mensagemView = new MensagemView($('#mensagem'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        //console.log(this.inputData); 

        this._listaNegociacao.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociacão cadastrada com sucesso!";
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacao.limpaLista();
        this._mensagem.texto = "Negociações foram apagadas";
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }


    _limpaFormulario() {
        //Limpa os campos do formulário
        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = '0';
        this._inputData.focus();
    }
}