// get elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const counter = document.getElementById('counter');

let taskCount = 0;
let completedCount = 0;

// event listener for the Add button
addButton.addEventListener('click', () => {

    // handle adding the user input to list
    const taskText = taskInput.value.trim(); // read the value from the input field
    if (taskText === '') return; // do nothing if the input is empty

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
});

// helper function
function updateCounter() {
    const remaining = taskCount - completedCount;
    counter.textContent = `Remaining: ${remaining} | Total: ${taskCount}`;
}

