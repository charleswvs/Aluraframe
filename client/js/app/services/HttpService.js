class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //Abre a conexão com o página
            xhr.open('GET', url);
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
                        resolve(JSON.parse(xhr.responseText));

                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);// Descobrir o que significa o terceiro parâmetro
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }
}