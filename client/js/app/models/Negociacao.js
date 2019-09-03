"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//A classe define o que é uma negociação
//Classes com constructor só podem ser criadas com New
var Negociacao = function () {
    function Negociacao(data, quantidade, valor) {
        _classCallCheck(this, Negociacao);

        //Javascript ainda não permite alterar os modificadores de acesso,
        //por isso utilizamos como convenção o underscore para identificar itens que só podem ser acessados pela própria classe
        this._data = new Date(data.getTime()); //Programação defensiva para evitar alterações na propriedade
        this._quantidade = quantidade;
        this._valor = valor;

        //Solução paliativa para mater as propriedades da classe como privadas...
        Object.freeze(this);
        //... ou quase, ele so congela as propriedades rasas da classe, não é um deep freeze,
        // se tentarmos, por exemplo, "data = this.data.setDate(12)" funcionará.
        //Resolveremos esse problema com programação defensiva
    }
    // Para não utilizarmos métodos privados, encapsulamos em getters & setters


    _createClass(Negociacao, [{
        key: "isEqual",
        value: function isEqual(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        }
    }, {
        key: "volume",
        get: function get() {
            return this._valor * this._quantidade;
        }
    }, {
        key: "data",
        get: function get() {
            //Aplicando programação defensiva, faremos o "get data()" apontar para outra referência
            return new Date(this._data.getTime());
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map