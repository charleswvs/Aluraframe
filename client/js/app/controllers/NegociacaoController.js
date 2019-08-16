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
        //... Que foi colocado na classe ProxyFactory

        this._listaNegociacao = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'limpaLista');

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event) {
        event.preventDefault();
        //console.log(this.inputData); 

        this._listaNegociacao.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociacão cadastrada com sucesso!";

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacao.limpaLista();
        this._mensagem.texto = "Negociações foram apagadas";
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        Promise.all([service.obterNegociacoesDaSemana(), 
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
            ).then(negociacoes =>{
            negociacoes.reduce((prev,cur)=> prev.concat(cur),[])
            .forEach(negociacao => {
                console.log(negociacao);
                this._listaNegociacao.adiciona(negociacao);
            });
        }).catch(erro =>{ 
            this._mensagem.texto = erro;
        });
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