const campos = [
    //busca um elemento do DOM buscando um elemento CSS
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];
/** */
const tbody = document.querySelector('table tbody');

// adiciona um listner ao evento 'submit' da classe '.form' e executa a callback function
document.querySelector('.form').addEventListener('submit', function(e){
    //Previne que o navegador execute a função de recarregar a página
    e.preventDefault();
    // cria o elemento 'tr'
    const tr = document.createElement('tr');

    campos.forEach(function(campo){
        //para cada elemento de "campos" faça:
        // - Cria um elemento 'td'
        let td = document.createElement('td');
        // - Cria um texto com o valor pego no campo
        td.textContent = campo.value;
        // - Adiciona a td a tr, como uma child
        tr.appendChild(td);
    });

    // cria um elemento td com o conteúdo de "#quantidade" * "#valor"
    const tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();
});