const taskInput = document.getElementById('taskInput');
const reminderInput = document.getElementById('reminderInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(${i})">
        ${task.text}
      </span>
      <div>
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="deleteTask(${i})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  if (taskInput.value.trim() === '') return alert('Enter a task!');
  const newTask = { text: taskInput.value, completed: false };
  tasks.push(newTask);
  renderTasks();

  // Reminder logic
  const mins = parseInt(reminderInput.value);
  if (!isNaN(mins) && mins > 0) {
    setTimeout(() => {
      alert(`Reminder: ${newTask.text}`);
    }, mins * 60000);
  }

  taskInput.value = '';
  reminderInput.value = '';
}

function toggleComplete(i) {
  tasks[i].completed = !tasks[i].completed;
  renderTasks();
}

function editTask(i) {
  const newText = prompt('Edit task:', tasks[i].text);
  if (newText) tasks[i].text = newText;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

addBtn.addEventListener('click', addTask);
renderTasks();
