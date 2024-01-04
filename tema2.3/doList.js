document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
   let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Campul nu este completat corespunzator');
        return;
    }

    let taskText = taskInput.value;
    let taskObject = { text: taskText, completed: false };
    let tasks = getTasks();

    tasks.push(taskObject);
    saveTasks(tasks);
    displayTasks();
    taskInput.value = '';
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1); 
    saveTasks(tasks);
    displayTasks();
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

function editTask(index) {
    let tasks = getTasks();
    let updatedText = prompt('Editati', tasks[index].text);
    if (updatedText !== null) {
        tasks[index].text = updatedText;
        saveTasks(tasks);
        displayTasks();
    }
}

function getTasks() {
    let storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById('taskList');
    let tasks = getTasks();
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let listItem = document.createElement('li');
        listItem.textContent = task.text;

        if (task.completed) {
            listItem.classList.add('completed');
        }

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sterge';
        deleteButton.onclick = (function(index) {
            return function() {
                deleteTask(index);
            };
        })(i);

        let editButton = document.createElement('button');
        editButton.textContent = 'Editeaza';
        editButton.onclick = (function(index) {
            return function() {
                editTask(index);
            };
        })(i);

        let toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Reactiveaza' : 'Completeaza';
        toggleButton.onclick = (function(index) {
            return function() {
                toggleTask(index);
            };
        })(i);

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        listItem.appendChild(toggleButton);
        taskList.appendChild(listItem);
    }
}
