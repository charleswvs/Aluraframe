//Module Pattern
var ConnectionFactory = (function (){
    var stores = ['negociacoes'];
    var version = 4;
    var dbName = 'aluraframe';

    var connection = null;

    return class ConnectionFactory{
        constructor(){
            throw new Error('Não é possível criar uma instância de ConnectionFactory, é uma classe estática')
        }

        static getConnection(){
            return new Promise((resolve, reject)=>{
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e =>{
                    console.log('Cria ou altera um banco');
                    ConnectionFactory._createStores(e.target.result);
                }

                openRequest.onsuccess = e =>{
                    console.log('Conexão estabelicida com sucesso');
                    if(!connection) connection = e.target.result;
                    resolve(connection);
                };

                openRequest.onerror = e => {    

                    console.log(e.target.error);

                    reject(e.target.error.name);
                };
            })
        }

        static _createStores(connection){
            stores.forEach(store => {

                if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }
}());