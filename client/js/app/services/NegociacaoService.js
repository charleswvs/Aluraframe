class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }
    obterNegociacoesDaSemana() {
        //return new Promise((resolve, reject) => {
            this._http('negociacoes/anterior').

       // })
    }

    obterNegociacoesDaSemanaPassada() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //Abre a conexão com o página
            xhr.open('GET', 'negociacoes/anterior');
            //Lança uma função toda vez que muda o estado da requisição

            xhr.onreadystatechange = () => {
                /**
                 * Estados disponíveis em uma requisição:
                 * 0: requisição ainda não inciada;
                 * 1: conexão com o servidor estabelecida;
                 * 2: requisição recebida;
                 * 3: processando requisição;
                 * 4: requisição concluída e a resposta está pronta;
                 */

                //devemos pegar a requisição estado 4
                if (xhr.readyState == 4) {
                    //Entretando o servidor pode retornar um erro, por isso pegaremos apenas o status 200
                    if (xhr.status == 200) {

                        //"xhr.responseText" é o retorno ao buscar um arquivo JSON, que precisa ser convertido pela função JSON.parse()
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana', null);
                    }
                }
            }
            xhr.send();
        })
    }
    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //Abre a conexão com o página
            xhr.open('GET', 'negociacoes/retrasada');
            //Lança uma função toda vez que muda o estado da requisição

            xhr.onreadystatechange = () => {
                /**
                 * Estados disponíveis em uma requisição:
                 * 0: requisição ainda não inciada;
                 * 1: conexão com o servidor estabelecida;
                 * 2: requisição recebida;
                 * 3: processando requisição;
                 * 4: requisição concluída e a resposta está pronta;
                 */

                //devemos pegar a requisição estado 4
                if (xhr.readyState == 4) {
                    //Entretando o servidor pode retornar um erro, por isso pegaremos apenas o status 200
                    if (xhr.status == 200) {

                        //"xhr.responseText" é o retorno ao buscar um arquivo JSON, que precisa ser convertido pela função JSON.parse()
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana', null);
                    }
                }
            }
            xhr.send();
        })
    }
}