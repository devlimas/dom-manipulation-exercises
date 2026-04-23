const inputTask = document.querySelector('#inputTask');
const btnAdd = document.querySelector('#btnAddTask');
const taskList = document.querySelector('#taskList');

btnAdd.addEventListener('click', () => {
    const textoTarefa = inputTask.value.trim();

    //validação de erro
    if (textoTarefa === "") {
        if (document.querySelector('.error-message')) return;

        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Por favor, digite uma tarefa!";
        errorMsg.className = "error-message text-red-500 text-xs mt-2 animate-pulse";

        const container = document.querySelector('section'); 
        container.appendChild(errorMsg);

        setTimeout(() => errorMsg.remove(), 3000);
        return; 
    }

    //criar os elementos (instanciando novos objetos para cada clique)
    const newli = document.createElement('li');
    const newspan = document.createElement('span');
    const divBotoes = document.createElement('div');

    //botão delete
    const btnDelete = document.createElement('button');
    btnDelete.textContent = "Delete";
    btnDelete.className = "bg-red-600 hover:bg-red-500 text-white font-semibold px-2 py-1 rounded transition-colors text-xs flex-shrink-0";
    btnDelete.addEventListener('click', () => newli.remove());

    //botão Edit (lógica in-place)
    const btnEdit = document.createElement('button');
    btnEdit.textContent = "Edit";
    btnEdit.className = "bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-2 py-1 rounded transition-colors text-xs flex-shrink-0";
    
    btnEdit.addEventListener('click', () => {
        //se já estiver editando, não faz nada
        if (newspan.querySelector('input')) return;

        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = newspan.textContent; 
        inputEdit.className = 'bg-transparent border-b border-cyan-500 text-slate-200 outline-none w-full';

        const textoOriginal = newspan.textContent;
        newspan.textContent = ''; 
        newspan.appendChild(inputEdit); 
        inputEdit.focus(); 

        const salvar = () => {
            const novoTexto = inputEdit.value.trim();
            newspan.textContent = novoTexto !== "" ? novoTexto : textoOriginal;
        };

        inputEdit.addEventListener('blur', salvar);
        inputEdit.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') salvar(); 
            if (e.key === 'Escape') newspan.textContent = textoOriginal;
        });
    });

//estilização do Layout (Ajuste fino contra transbordamento)
    //adicionamos 'min-w-0' para forçar o flexbox a calcular o espaço interno corretamente
    newli.className = 'bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex items-center justify-between mt-2 gap-4 min-w-0 w-full';
    
    //o 'min-w-0' aqui é crucial para o 'break-all' funcionar dentro de um flex-item
    newspan.className = 'text-slate-200 break-all flex-1 min-w-0'; 
    newspan.textContent = textoTarefa;
    
    //container de botões travado
    divBotoes.className = "flex gap-2 flex-shrink-0 items-center";

    //montagem da Hierarquia
    divBotoes.appendChild(btnEdit);
    divBotoes.appendChild(btnDelete);
    newli.appendChild(newspan); 
    newli.appendChild(divBotoes); 
    taskList.appendChild(newli);

    //Reset do campo
    inputTask.value = "";
    inputTask.focus();
});

//atalho para o Enter no input principal
inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnAdd.click();
});