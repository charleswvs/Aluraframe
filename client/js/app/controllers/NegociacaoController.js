'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        //usando um "bind()" para deixar o "document.querySelector" vinculado ao "document", 
        //caso contrário, a variável criada como alias não funcionaria corretamente, pois
        //perderia o contexto  
        var $ = document.querySelector.bind(document);

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

        this._listaNegociacao = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'limpaLista', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        // Propriedade pega o estado atual da ordenação, que no início é = 0
        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',
        value: function adiciona(event) {
            var _this = this;

            event.preventDefault();
            //console.log(this.inputData); 

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this._listaNegociacao.adiciona(negociacao);
                _this._mensagem.texto = mensagem;
                _this._limpaFormulario();
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this2 = this;

            this._service.apaga().then(function (mensagem) {
                _this2._mensagem.texto = mensagem;
                _this2._listaNegociacao.limpaLista();
            }).catch(function (erro) {
                _this2._mensagem.texto = erro;
            });

            // TODO: Criar uma forma de apagar somente uma negociação
            // - Criar um botão em cada negociação renderizada
            // - Pegar de alguma forma sua pocição no array
            // - Apagar no banco, na lista de negociações e remover da view
            // - Faça tudo isso utilizando primises, DAO e Negociação Service
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacao.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacao.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacao.inverteOrdem();
            } else {
                this._listaNegociacao.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            //Limpa os campos do formulário
            this._inputData.value = '';
            this._inputQuantidade.value = '1';
            this._inputValor.value = '0';
            this._inputData.focus();
        }
    }, {
        key: '_init',
        value: function _init() {
            var _this4 = this;

            // Lista todas as negociações que estão no banco:
            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this4._listaNegociacao.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });

            //irá importar as negociacoes conforme o tempo estipulado:
            setInterval(function () {
                _this4.importaNegociacoes();
            }, 3000);
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map