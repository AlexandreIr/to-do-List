const form=document.querySelector('form');
const tbTasks=document.querySelector('table');
//submit event
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const task=form.taskInput.value;
    createTask(task);


    form.reset();
    form.taskInput.focus();

    localStorage.removeItem('tasks');
    for(let i=1; i<tbTasks.rows.length; i++){
        const auxTasks=tbTasks.rows[i].cells[0].innerText;
        record(auxTasks);
    }
    
})
//display tasks
const createTask=(task)=>{
    const line = tbTasks.insertRow(-1);

    const col1=line.insertCell(0);
    const col2=line.insertCell(1);
    const col3=line.insertCell(2);

    col1.innerText=task;
    col3.innerHTML="<i class='exclude' title='Exclude'> &#10008</i>";
    col2.innerHTML="<i class='edit' title='edit'> &#x270E</i>";
}
//records tasks on localStorage
const record=(task)=>{
    if(localStorage.getItem('tasks')){
        const recordedtasks=localStorage.getItem('tasks')+';'+task ;
        localStorage.setItem('tasks', recordedtasks);
    }else{
        localStorage.setItem('tasks', task);
    }
}
//excludes tasks
const exclusion=(e)=>{
    if(e.target.classList.contains('exclude')){
        const task=e.target.parentElement.parentElement.children[0].innerText;
        if(confirm(`confirma a exclusão de ${task}`)){
            e.target.parentElement.parentElement.remove();
            localStorage.removeItem('tasks')
        }
    }
    for(let i=1; i<tbTasks.rows.length; i++){
        const auxTasks=tbTasks.rows[i].cells[0].innerText;
        record(auxTasks);
    }
}

const edition=(e)=>{
    if(e.target.classList.contains('edit')){
        const task=e.target.parentElement.parentElement.children[0].innerText;
        const cell=e.target.parentElement.parentElement.children[0];
        const promptCell=prompt('Digite novo texto', task);

        if(promptCell!=task) cell.innerText=promptCell;
        localStorage.removeItem('tasks');
        for(let i=1; i<tbTasks.rows.length; i++){
            const auxTasks=tbTasks.rows[i].cells[0].innerText;
            record(auxTasks);
        }    
    }
}
//load saved tasks 
window.addEventListener('load', ()=>{
    if(localStorage.getItem('tasks')){
        const tasks=localStorage.getItem('tasks').split(';');
        tasks.forEach(task=>createTask(task));
    }
})

tbTasks.addEventListener('click', exclusion)
tbTasks.addEventListener('click', edition)

