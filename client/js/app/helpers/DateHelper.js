class DateHelper{
    constructor(){
        console.log("Esta é uma classe estática, portanto não pode ser instaciada!");
    }

    static textoParaData(texto){
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error("O texto precisa estar no formato yyyy-mm-dd");
        }
        return new Date(
            //Spread Operator na Data recuperada no HTML
            ...texto //"yyyy-mm-dd"
            //Utilizando o método split para criar um Array com os números nas datas
            .split('-')
            //Utilizando o método map para concertar a data, que será submetida com Int,
            //devido ao constructor de "Date"
            .map((item, i) => item - i % 2)
        );
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}