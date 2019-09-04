<<<<<<< HEAD
class NegociacaoDao {

    constructor(connection) {

=======
export class NegociacaoDao{
    constructor(connection){
>>>>>>> ed5569818220276a8b8743340bcdc735af4f9fb8
        this._connection = connection;
        this._store = 'negociacoes';
    }

<<<<<<< HEAD
    adiciona(negociacao) {

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');

            };

        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

=======
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
>>>>>>> ed5569818220276a8b8743340bcdc735af4f9fb8
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

<<<<<<< HEAD
            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) {

                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();

                } else {

                    resolve(negociacoes);
                }

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar as negociações');
            };

        });
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

=======
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
        return new Promise ((resolve, reject)=>{
>>>>>>> ed5569818220276a8b8743340bcdc735af4f9fb8
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

<<<<<<< HEAD
            request.onsuccess = e => resolve('Negociações apagadas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações');
            }; 

        });

    }
}
=======
            request.onsuccess = e => resolve('Negociações removidas com sucesso');
            
            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível remover as negociações')
            }
        });
    }
} 
>>>>>>> ed5569818220276a8b8743340bcdc735af4f9fb8
