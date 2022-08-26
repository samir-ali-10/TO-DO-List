let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks")


let arrayOfTasks = [];

if(localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLS();


// Add Task
submit.onclick = function() {
    if(input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
}

tasksDiv.addEventListener("click", (e) => {
    // Delete btn
    if(e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    // Task element
    if(e.target.classList.contains("task")) {
        toggleStatusOfTask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
})

// addTaskToArray Function
function addTaskToArray(tasksText) {
    const task = {
        id: Date.now(),
        title: tasksText,
        completed: false,
    };
    // Push Task TO The Array
    arrayOfTasks.push(task);
    // Add Task To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Task To Local Storage
    addDataToLSFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    // Looping on the array of tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.completed === true) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // Append all of this to tasksDiv
        tasksDiv.appendChild(div);
    });
}

function addDataToLSFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLS() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLSFrom(arrayOfTasks);
}

function toggleStatusOfTask(taskId) {
    for(let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true: arrayOfTasks[i].completed = false;
        }
    }
    addDataToLSFrom(arrayOfTasks);
}