const form=document.querySelector('form');
const tbTasks=document.querySelector('table');
//submit event
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const task=form.taskInput.value;
    createTask(task);

    form.reset();
    form.taskInput.focus();
})
//display and recor tasks
const createTask=(task)=>{
    const line = tbTasks.insertRow(-1);

    const col1=line.insertCell(0);
    const col2=line.insertCell(1);

    col1.innerText=task;
    col2.innerHTML="<i class='exclude' title='Exclude'> &#10008</i>";
    col2.classList.add('exclude');
    record(col1.innerText);
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
//load saved tasks 
window.addEventListener('load', ()=>{
    if(localStorage.getItem('tasks')){
        const tasks=localStorage.getItem('tasks').split(';');
        tasks.forEach(task=>createTask(task));
    }
})

tbTasks.addEventListener('click', exclusion)

