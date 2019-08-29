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

        this._service = new NegociacaoService();

        this._init();
    }

    adiciona(event) {
        event.preventDefault();
        //console.log(this.inputData); 

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then((mensagem) => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacao.limpaLista();
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            })

        // TODO: Criar uma forma de apagar somente uma negociação
        // - Criar um botão em cada negociação renderizada
        // - Pegar de alguma forma sua pocição no array
        // - Apagar no banco, na lista de negociações e remover da view
        // - Faça tudo isso utilizando primises, DAO e Negociação Service

    }

    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacao.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._listaNegociacao.adiciona(negociacao));
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

    
    _init() {
        // Lista todas as negociações que estão no banco:
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacao.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        //irá importar as negociacoes conforme o tempo estipulado:
        setInterval(() => {
            this.importaNegociacoes();
        }, 3000)
    }
}