class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDAO(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(() => {
                console.log(erro);
                throw new Erro('Não foi possível adicionar a negociação')
            });
    }

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDAO(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro =>{
                console.log(erro);
                throw new Error ('Não foi possível obter as negociaçãoes');
            })
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(()=> 'Negociações Apagadas com sucesso')
            .catch(erro=>{
                console.log(erro);
                throw new Error('Não foi possível obter as negociações')
                
            })
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });
        });


    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });
        });
    }


    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }
}