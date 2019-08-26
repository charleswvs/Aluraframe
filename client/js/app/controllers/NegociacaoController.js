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
            'adiciona', 'limpaLista', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        // Propriedade pega o estado atual da ordenação, que no início é = 0
        this._ordemAtual = '';
    }

    adiciona(event) {
        event.preventDefault();
        //console.log(this.inputData); 

        ConnectionFactory
            .getConnection()
            .then(conexao => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDAO(conexao)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacao.adiciona(this._criaNegociacao());

                        this._mensagem.texto = "Negociacão cadastrada com sucesso!";

                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    apaga() {
        this._listaNegociacao.limpaLista();
        this._mensagem.texto = "Negociações foram apagadas";
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacao.inverteOrdem();
        } else {
            this._listaNegociacao.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }



    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
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