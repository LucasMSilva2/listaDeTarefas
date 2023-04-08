function listaDeTarefas(){
    // Selecionando as tags
    const inputTarefa = document.querySelector('.input-tarefa');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const tarefas = document.querySelector('.tarefas');

    // Função que cria um li
    function criaLi() {
        const li = document.createElement('li'); 
        return li;
    }

    // Função que limpa o input
    function limpaInput() {
        inputTarefa.value = '';
        inputTarefa.focus();
    }

    // Função que cria o checkbox apagar
    function apagarTarefa(li) {
        const checkboxApagar = document.createElement('input');
        checkboxApagar.setAttribute('type', 'checkbox');
        checkboxApagar.setAttribute('class', 'Apagar');
        checkboxApagar.setAttribute('title', 'Apagar');
        li.appendChild(checkboxApagar);
        li.innerHTML += ' ' + li.innerText;
    }

    /*  Função que cria o botão(ícone) editar, reparem que o ícone é importado
    de uma biblioteca de icones PhosphorIcons */
    function criaBotãoEditar(li) {
        li.innerHTML += ' ';
        const botaoEditar = document.createElement('i');
        botaoEditar.setAttribute('class', 'ph-light ph-pencil-simple');
        botaoEditar.setAttribute('id', 'Editar');
        botaoEditar.setAttribute('title', 'Editar');
        li.appendChild(botaoEditar);

        // Aqui damos a funcionalidade do botão editar
        botaoEditar.addEventListener('click', function (event) {
            const elementoClicado = event.target;
            const parentEl = elementoClicado.parentElement;

            let text = parentEl.innerText;
            const input = document.createElement('input');

            input.setAttribute('type', 'text');
            input.setAttribute('onfocus', 'this.selectionStart = this.selectionEnd = this.value.length;')
            text = text.replace('Editar', '').trim();
            
            input.setAttribute('value', text.trim());
            parentEl.innerHTML = '';
            
            parentEl.appendChild(input);
            input.focus();

            input.addEventListener('keypress', function(e) {
                if(e.key === "Enter"){
                    if(!input.value){
                        parentEl.remove();
                    }
                    const novoTexto = input.value.trim();
                    parentEl.innerHTML = '';
                    apagarTarefa(parentEl);
                    parentEl.innerHTML += ' ' + novoTexto;
                    criaBotãoEditar(parentEl);
                    salvarTarefas();
                }
            })
        });
    }

    // Umas das funções mais chamadas, ela cria a tarefa em sí.
    function criaTarefa (textoInput) {
        const li = criaLi();
        apagarTarefa(li);
        li.innerHTML += ' ' + textoInput;
        tarefas.appendChild(li);
        limpaInput();
        criaBotãoEditar(li);
        salvarTarefas();
    }

    // Ao clicar no botão adicionar, cria a tarefa com o valor do input
    btnTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    });

    // evento que apaga a tarefa ao pressionar o checkbox
    document.addEventListener('click', function (e) {
        const el = e.target; //qual elemente esta sendo clicado
        const parentEl = el.parentElement; 
        
        if(el.classList.contains('Apagar')){
            parentEl.remove();
            salvarTarefas();
        } 
    });

    // Ao pressionar a tecla enter no input, cria a tarefa
    inputTarefa.addEventListener('keypress', function(e){
        if (e.key === "Enter"){
            if(!inputTarefa.value) return;
            criaTarefa(inputTarefa.value);
            
        }
    });

    // Função que seleciona as tarefas, armazena em uma lista, transforma em JSON e armazena no local Storage
    function salvarTarefas() {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            tarefaTexto = tarefaTexto.replace('Editar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }

        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    /* Função que pega os dados JSON salvos no localStorage e armazena 
    em uma variável, percorremos essa variável, criando a tarefa com seu respectivo valor. */
    function adicionaTarefasSalvas () {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);

        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }

    adicionaTarefasSalvas();
};

listaDeTarefas();
