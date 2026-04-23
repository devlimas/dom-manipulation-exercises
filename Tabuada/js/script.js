const table = document.querySelector('#table');
const panel = document.querySelector('#panel');

const inputNumber = document.querySelector('#number');
const inputMultiply = document.querySelector('#multiplier');

const btnResult = document.querySelector('#btnResult');

const result = document.querySelector('#result');
const resultList = document.querySelector('#resultList');

btnResult.addEventListener('click', (e) => {
    e.preventDefault();

    //validações
    const currentError = table.querySelector('.error-message');
    if (currentError) currentError.remove();

    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild);
    }

    const numberOne = inputNumber.value;
    const numberTwo = inputMultiply.value;

    if (numberOne === '' || numberTwo === '') {
        mostrarErro('Ambos os campos devem ser preenchidos');
        return;
    } 
    
    if (numberOne.includes(' ') || numberTwo.includes(' ')) {
        mostrarErro('Números não podem conter espaços');
        return;
    }

    if (isNaN(numberOne) || isNaN(numberTwo)) {
        mostrarErro('Apenas números válidos são permitidos');
        return;
    }

    const number = parseInt(numberOne);
    const multiplier = parseInt(numberTwo);

    if (number < 0 || multiplier < 0) {
        mostrarErro('Números não podem ser negativos');
        return;
    }

    //gera a tabuada por meio de um loop, criando um novo <li> para cada resultado
    for (let i = 1; i <= multiplier; i++) {
        const itemResult = number * i;
        const li = document.createElement('li');
        li.textContent = `${number} x ${i} = ${itemResult}`;
        result.getElementsByTagName('h2')[0].textContent = `Tabuada de ${number}`;
        resultList.appendChild(li);
    }
});

//evitar erros de repetição
function mostrarErro(texto) {
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message text-red-500 text-xs mt-2 animate-pulse text-center';
    errorMessage.textContent = texto;
    table.appendChild(errorMessage);
    setTimeout(() => { if(errorMessage) errorMessage.remove() }, 1500);
}
