



window.addEventListener("DOMContentLoaded", loadTask);  
window.addEventListener("DOMContentLoaded", checkEmpty);





function updatComple(checkbox) {
    const container = checkbox.closest('.task');
    const today = new Date().toISOString().split('T')[0];
    const taskDate = container.querySelector('.date span').textContent;

    // Update classes
    if (checkbox.checked) {
        container.classList.remove('activeeee', 'overDue');
        container.classList.add('completed');
        container.querySelector('.indi-overDue').style.display = 'none'
    } else {
        container.classList.remove('completed');
        if (taskDate < today) {
            container.classList.add('overDue');
            container.classList.remove('activeeee');
            container.querySelector('.indi-overDue').style.display = 'block'

        } else {
            container.classList.add('activeeee');
            container.classList.remove('overDue');


        }
    }

    // Update counters dynamically
    document.getElementById('total').textContent = document.querySelectorAll('.task').length;
    document.getElementById('complete').textContent = document.querySelectorAll('.completed').length;
    document.getElementById('acti').textContent = document.querySelectorAll('.activeeee').length;
    document.getElementById('OverD').textContent = document.querySelectorAll('.overDue').length;

    saveTask();

}


















function automaticCheck() {
    let containers = document.querySelectorAll('.completed');
    let duess = document.querySelectorAll('.overDue');

    containers.forEach(task => {
        let checkbox = task.querySelector('.checkboxx');
            checkbox.checked = true;

    });


        duess.forEach(due => {
        let warnn = due.querySelector('.indi-overDue');
        warnn.style.display = 'block';

    });
}



function isPastDate() {
    const selected = document.getElementById('Due').value;
    const today = new Date().toISOString().split('T')[0];

    return selected < today;
}






function hide(){
    let x = document.getElementById('modal');
    x.style.display = "none"
}

function Add_task(){
    let x = document.getElementById('modal');
    x.style.display = "flex"
    document.getElementById('taskPreview').style.display = 'none';
    document.getElementById('firstModal').style.display = 'flex'

}


async function addTask(){
    let boxx = document.getElementById('allTasks');
    let title = document.getElementById('title').value.trim()
    let description = document.getElementById('description').value.trim()
    let priority = document.getElementById('priority').value
    let date = document.getElementById('Due').value.trim()
    let tag = document.getElementById('tags').value.trim()

    let newBox = document.createElement('div')
    newBox.classList.add("task","activeeee")


newBox.innerHTML = `
    <div class="descrip">
                <div class="chkHed">
                    <input type="checkbox" id="checkboxx" class="checkboxx" onclick="updatComple(this.closest('.task'))">
                    <label for="checkboxx" class="name">${title}</label>
                </div>
                <div class="pri"></div>
            </div>
            <div class="task-not" onclick ="previewTask(this)">
                <p class="todo">${description}</p>
            </div>
     <div class="details">
        <div class="indictors">

            <div class="sub-data">
                <p class="date"><i class="fa-regular fa-calendar"></i> <span>${date}</span></p>
                <p class="tag"><i class="fa-solid fa-tag"></i> <span>${tag}</span></p>
            </div>    

            <div class="warn">
                <p class="indi-overDue"><i class="fa-solid fa-triangle-exclamation"></i></p>
            </div>

        </div>    
    </div>            
    `

    if(title !== "" && description !== "" && priority !== "" && date !== "" && tag !== ""){
       if(priority === "medium"){
        let priElement = newBox.querySelector(".pri")
        priElement.style.backgroundColor = "rgb(255, 192, 17)"
        }

     else if(priority === "low"){
        let priElement = newBox.querySelector(".pri")
        priElement.style.backgroundColor = "green"
        } 

     else if(isPastDate()){
            newBox.classList.remove("activeeee")
            newBox.classList.add("overDue")
            let over = document.getElementById('OverD')
            let addOver = Number(over.textContent)
            over.textContent = addOver + 1;

            let warnning = newBox.querySelector('.indi-overDue')
            warnning.style.display = "block";

       } 


    boxx.prepend(newBox);
    
    document.getElementById('myform').reset()
    successful()

       updateCounters()

    saveTask()      


    await new Promise(res => setTimeout(res, 1500));
            hide()

    }


    else{
       alert('Please fill all fields before submitting!')


    }

}






async function successful(){
    let fm = document.getElementById('myform')
    fm.style.display = "none"
    let message = document.querySelector('.success')
    message.style.display ="flex"
    
    await new Promise(res => setTimeout(res, 1500));
    fm.style.display = "block"
    message.style.display ="none"

}



function active(button){
    let allClasses = document.querySelectorAll('.cont')
    allClasses.forEach(el => el.classList.remove("curr-section"))
    button.classList.add("curr-section")
}


function filter(filter,button){
//filtring    
    let tasks = document.querySelectorAll('.task')
    tasks.forEach(x => x.classList.add('hide')
);
//deselecting button
let deselect = document.querySelectorAll('.filt')
deselect.forEach( a => a.classList.remove('active'))
//showing result
let actTask = document.querySelectorAll(filter)
    actTask.forEach( y => y.classList.remove('hide'));

    button.classList.add('active')

}


function showall(button){
    let tasks = document.querySelectorAll('.task')
    tasks.forEach(x => x.classList.remove('hide')
);    

//deselecting button
let deselect = document.querySelectorAll('.filt')
deselect.forEach( a => a.classList.remove('active'))
button.classList.add('active')

}




function showCurrent(section,currnt){
    let dash = document.getElementById('dashboardDiv')
    let task = document.getElementById('taskList')
    let team = document.getElementById('teams')
    let settingss = document.getElementById('settings')
    let anlytics = document.getElementById('analitics')
    let name = document.getElementById('active-section')
    name.textContent = currnt;


task.style.display = "none"
team.style.display = "none"
dash.style.display = "none"
settingss.style.display = "none"
anlytics.style.display = "none"

document.getElementById(section).style.display ='block'


if(section === "taskList"){
    let clss = document.querySelector('.allTasks')
    clss.classList.add('fullscreen')
}

if (window.matchMedia("(max-width: 1024px)").matches) {
hideMenu()
}


}







function homee(){
let dash = document.getElementById('dashboardDiv')
let task = document.getElementById('taskList')

//Hide all this 
let team = document.getElementById('teams')
let settingss = document.getElementById('settings')
let anlytics = document.getElementById('analitics')
let clss = document.querySelector('.allTasks')
clss.classList.remove('fullscreen')

team.style.display = "none"
dash.style.display = "none"
settingss.style.display = "none"
anlytics.style.display = "none"


document.getElementById('active-section').textContent = "Dashboard";

dash.style.display = "block"
task.style.display = "block"

if (window.matchMedia("(max-width: 1024px)").matches) {
hideMenu()
}
}


function saveTask() {
    const tasks = [];
    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {
        tasks.push({
            tiitle: task.querySelector('.name').textContent,
            description: task.querySelector(".todo").textContent,
            priority: task.querySelector(".pri").style.backgroundColor,
            date: task.querySelector(".date span").textContent,
            tag: task.querySelector(".tag span").textContent,
            completed: task.querySelector("input[type=checkbox]").checked,
            overdue: task.classList.contains('overDue')
        });
    });

    // Save only the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTask() {
    const saved = localStorage.getItem("tasks");
    if (!saved) return;


const today = new Date().toISOString().split('T')[0];
let overdueCount = 0;

    const tasks = JSON.parse(saved);
    const boxx = document.getElementById('allTasks');
    boxx.innerHTML = "";

   tasks.reverse().forEach(task => {
    const newBox = document.createElement("div");
    newBox.classList.add("task");

    // Determine status properly
    if (task.completed) {
        newBox.classList.add("completed");
    } 
    else if (task.date < today) {
        newBox.classList.add("overDue");
        overdueCount++;
    } 
    else {
        newBox.classList.add("activeeee");
    }

    newBox.innerHTML = `
        <div class="descrip">
            <div class="chkHed">
                <input type="checkbox" 
                       ${task.completed ? "checked" : ""} 
                       class="checkboxx"
                       onclick="updatComple(this)">
                <label class="name">${task.tiitle}</label>
            </div>
            <div class="pri"></div>
        </div>
        <div class="task-not" onclick="previewTask(this.closest('.task'))">
            <p class="todo">${task.description}</p>
        </div>
        <div class="details">
         <div class="indictors">
            <div class="sub-data">
                <p class="date"><i class="fa-regular fa-calendar"></i> <span>${task.date}</span></p>
                <p class="tag"><i class="fa-solid fa-tag"></i> <span>${task.tag}</span></p>
            </div>  
            <div class="warn">
                <p class="indi-overDue"><i class="fa-solid fa-triangle-exclamation"></i></p>
            </div>
            </div>  
        </div>
    `;

newBox.querySelector(".pri").style.backgroundColor = task.priority;

    const warningIcon = newBox.querySelector('.indi-overDue');
if (task.overdue && warningIcon) {
    warningIcon.style.display = 'block';
}
    boxx.prepend(newBox);
});



const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const active = total - completed - overdueCount;

document.getElementById('total').textContent = total;
document.getElementById('complete').textContent = completed;
document.getElementById('acti').textContent = active;
document.getElementById('OverD').textContent = overdueCount;
}


function updateCounters() {
    const tasks = document.querySelectorAll('.task');

    const total = tasks.length;
    const completed = document.querySelectorAll('.task.completed').length;
    const overdue = document.querySelectorAll('.task.overDue').length;
    const active = total - completed - overdue;

    const totalEl = document.getElementById('total');
    const completeEl = document.getElementById('complete');
    const activeEl = document.getElementById('acti');
    const overdueEl = document.getElementById('OverD');

    if (totalEl) totalEl.textContent = total;
    if (completeEl) completeEl.textContent = completed;
    if (activeEl) activeEl.textContent = active;
    if (overdueEl) overdueEl.textContent = overdue;

    automaticCheck();
    checkEmpty();
}



function showMenu(){
    let menu = document.getElementById('navMenu')
    menu.style.display = "block"
}
function hideMenu(){
    let menu = document.getElementById('navMenu')
    menu.style.display = "none"
}


let currentTask = null;

function previewTask(task){
    currentTask = task;
    let container = document.getElementById('forDelsake')
    let taskName = task.querySelector('.name').textContent
    let taskNote =  task.querySelector('.todo').textContent
    let taskDate = task.querySelector('.date').textContent
    let tasktag = task.querySelector('.tag').textContent
    
    container.querySelector('.taskName').textContent = taskName;
    container.querySelector('.TaskNOte').textContent = taskNote;
    container.querySelector('.dateee').innerHTML = `<i class="fa-regular fa-calendar"></i> <span>${taskDate}</span>` ;
    container.querySelector('.tage').innerHTML = `<i class="fa-solid fa-tag"></i> <span>${tasktag}</span>`;
    


    let x = document.getElementById('modal');
    x.style.display = "flex"


    document.getElementById('firstModal').style.display = 'none'
    document.getElementById('taskPreview').style.display = 'flex'

}


 async function deleteTask(){
        currentTask.remove()
    let fm = document.getElementById('forDelsake')
    fm.style.display = "none"
    let message = document.querySelector('.ddd')
    message.style.display ="flex"

    await new Promise(res => setTimeout(res, 1500));
    fm.style.display = "block"
    message.style.display ="none"


    updateCounters();
    saveTask();
    hide();

}








function closePrview(){
       document.getElementById('taskPreview').style.display = 'none'
       document.getElementById('modal').style.display = 'none'
}

function checkEmpty(){
    let list = document.getElementById('allTasks')
    if(list.children.length === 0){
        document.querySelector('.noEle').style.display = 'block'
    }
    else{
                document.querySelector('.noEle').style.display = 'none'

    }
    
}