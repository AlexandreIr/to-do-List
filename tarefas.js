const form=document.querySelector('form')
const divBoard=document.getElementById('divBoard')
//Listener do submit
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    //recolhe o dado inserido no campo do form
    const task=form.inTask.value
    //cria os elementos html e atribui valores a eles
    const h5=document.createElement('h5')
    const text=document.createTextNode(task)
    h5.appendChild(text)
    divBoard.appendChild(h5)
    //limpa o campo do forms e forca nele novamente
    form.inTask.value=''
    form.inTask.focus()
})
//Listener do btSelect
form.btSelect.addEventListener('click',()=>{
    //pega todos os elementos h5 da página
    const tasks=document.querySelectorAll('h5')
    //se não houverem h5...
    if(tasks.length==0){
        alert('Não há nenhuma tarefa na lista')
        return
    }
    //variável auxilia iniciada em -1
    let aux=-1
    //se houver elementos h5 na página, começa a iteração
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].className=='selected-task'){    //se aquele elemento possuir selected-tas como classe...
            tasks[i].className='normal-task'    //modifica a classe para normal-task
            aux=i   //muda o valo da variável auxiliar para i
            break
        }
    }
    //se aux for igual ao indice do último h5...
    if(aux==tasks.length-1){
    aux=-1  //retorna ao valor original
    }
    //ao clicar no botão, a classe selected-task é atribuida ao elemento [0] de tasks
    tasks[aux+1].className='selected-task'
})
//listener do btExclude
form.btExclude.addEventListener('click', ()=>{
    //novamente tasks recebe todos os h5
    const tasks=document.querySelectorAll('h5')
    //variável auxiliar é declarada valendo -1
    let aux=-1
    //iteração sobre cada elemento de tasks
    tasks.forEach((task, i)=>{
        if(task.className==='selected-task'){   //se o elemento atual tiver classe selected-task...
            aux=i   //a variável auxiliar recebe o valor i
        }
    })
    if(aux==-1){    //se o valor da variável continuar sendo -1...
        alert('Selecione uma tarefa para que possa ser removida')
        return
    }
    //pergunta se o usuário deseja realmente remover aquele elemento
    if(confirm('Deseja realmente excluir '+tasks[aux].innerText+' ?')){
        divBoard.removeChild(tasks[aux])    //caso realmente deseje remover aquele nó, ele remove
    }
    form.btSelect.dispatchEvent(new Event('click'))     //seleciona a primeira tarefa da lista
})
//Listener de btRecord
form.btRecord.addEventListener('click',()=>{
    //novamente busca todas as tags h5 
    const tasks=document.querySelectorAll('h5')
    //se não houverem h5...
    if(tasks.length==0){
        alert('Não há nada para ser gravado')
        return
    }
    //caso haja...
    let data=''
    tasks.forEach(task=>{   //itera sobre cada um dos h5 
        data+=task.innerText+';'    //adiciona o texto na variável data separados por ;
    })
    //armazena o valor de data em dailyTasks removendo o último ;
    localStorage.setItem('dailyTasks', data.slice(0,-1))
    //verifica se os itens realmente foram salvos em localStorage
    if(localStorage.getItem('dailyTasks')){
        alert('Ok itens salvos!')
    }
})
//ao carregar a página...
window.addEventListener('load',()=>{
    if(localStorage.getItem('dailyTasks')){     //verifica se dailyTasks se encontra em localStorage
        const data=localStorage.getItem('dailyTasks').split(';')    //caso se encontre, cria um array
        //recria no DOM a lista de tarefas salva anteriormente no 
        data.forEach(task=>{
            const h5=document.createElement('h5')
            h5.innerText=task
            divBoard.appendChild(h5)
        })
    }
})

