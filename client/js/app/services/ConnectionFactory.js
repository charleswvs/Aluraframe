var stores = ['negociacoes'];
var version = 4;
var dbName = 'aluraframe';

class ConnectionFactory{
    constructor(){
        throw new Error('Não é possível criar uma instância de ConnectionFactory, é uma classe estática')
    }

    static getConnection(){
        return new Promise((resolve, reject)=>{
            let openRequest = window.indexedDB.open('negociacoes', 4);

            openRequest.onupgradeneeded = e =>{
                console.log('Cria ou altera um banco');
                ConnectionFactory._createStores(e.target.result)
                
            }

            openRequest.onsuccess = e =>{
                resolve(e.target.result);
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