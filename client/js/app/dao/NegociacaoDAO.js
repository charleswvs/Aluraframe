class NegociacaoDAO{
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject)=>{
            //Cria de transação
            //      let transaction = this._connection.transaction([this._store], 'readwrite');
            // Armazena a store de 'negociacoes'
            //      let store = transaction.objectStore(this._store);
            // Cria uma requisição que adiciona uma negociacao ao banco
            //      let request = store.add(negociacao);

            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e =>{
                resolve();
            }

            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível adicionar uma negociação')
            }
        })
    }

    listaTodos(){
        return new Promise ((resolve, reject)=>{
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e =>{
                let atual = e.target.result;

                if (atual) {
                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor))

                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível listar as negociações');
            }
        });
    }

    apagaTodos(){
        // TODO: Criar uma forma de apagar somente uma negociação
        // - Criar um botão em cada negociação renderizada
        // - Pegar de alguma forma seu número de registro
        // - Apagar no banco, na lista de negociações e remover da view

        return new Promise ((resolve, reject)=>{
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações removidas com sucesso');
            
            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível remover as negociações')
            }
        });
    }
} 