const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => createTodoItem(todo));
};

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;
  createTodoItem(todoText);
  saveTodo(todoText);
  todoInput.value = "";
}

function createTodoItem(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    const newText = prompt("Edit your todo:", span.textContent);
    if (newText && newText.trim() !== "") {
      updateTodo(span.textContent, newText.trim());
      span.textContent = newText.trim();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    todoList.removeChild(li);
    removeTodo(span.textContent);
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function saveTodo(text) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(text) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(todo => todo !== text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodo(oldText, newText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.indexOf(oldText);
  if (index !== -1) {
    todos[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
