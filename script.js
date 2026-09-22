// get elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const counter = document.getElementById('counter');
const removeLastButton = document.getElementById('remove-last-button');
const toast = document.getElementById('toast');

let taskCount = 0;
let completedCount = 0;

// event listener for the Add button
addButton.addEventListener('click', addTask);

function addTask() {
    // handle adding the user input to list
    const taskText = taskInput.value.trim(); // read the value from the input field
    if (taskText === '') {
        showToast('Please enter a task first');
        return; // do nothing if the input is empty
    }

    const isDuplicate = Array.from(todoList.children)
        .some(li => li.textContent === taskText);
    if (isDuplicate) {
        showToast('This task is already on the list');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;
    todoList.appendChild(li);
    taskInput.value = '';

    // update the task counter
    taskCount++;
    updateCounter();

    // handle marking the task as completed
    li.addEventListener('click', () => {
        const isCompleted = li.classList.toggle('completed');
        completedCount += isCompleted ? 1 : -1;
        updateCounter();
    });
}

// remove the last task from the list
removeLastButton.addEventListener('click', () => {
    const lastTask = todoList.lastElementChild;
    if (!lastTask) {
        showToast('The list is already empty');
        return;
    }

    if (lastTask.classList.contains('completed')) {
        completedCount--;
    }
    taskCount--;
    lastTask.remove();
    updateCounter();
});

// helper function
function updateCounter() {
    const remaining = taskCount - completedCount;
    counter.textContent = `Remaining: ${remaining} | Total: ${taskCount}`;
}

// show a short-lived toast notification
let toastTimeoutId;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => toast.classList.remove('visible'), 2000);
}

