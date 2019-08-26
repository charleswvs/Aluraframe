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
            let cursor = tihs._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
        })
    }
} 