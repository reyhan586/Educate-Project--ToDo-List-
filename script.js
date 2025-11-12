let todos = [];
let initialTodos = [];

function addTasks() {
  let inputItemElement = document.getElementById("todoItem");
  const inputItemValue = inputItemElement.value;
  const selectionMode = document.getElementById("mySelect");
  const addButton = document.getElementById("add-button");

  if (inputItemElement.value.trim() === "" || inputItemElement.value === null) {
    alert("Please enter the text of the task.");
    return;
  }
  const todoList = document.querySelector(".todo-list");
  const todoBox = document.createElement("div");
  const remove = document.createElement("button");
  const edit = document.createElement("button");
  const status = document.createElement("div");
  const buttonsDiv = document.createElement("div");
  const textDiv = document.createElement("div");
  const taskTitle = document.createElement("span");

  todoList.appendChild(todoBox);
  todoBox.appendChild(textDiv);
  textDiv.appendChild(taskTitle);
  buttonsDiv.appendChild(status);
  todoBox.appendChild(buttonsDiv);
  buttonsDiv.appendChild(remove);
  buttonsDiv.appendChild(edit);

  textDiv.className = "textDiv";
  todoBox.className = "todo-box";
  status.className = "status-button";
  remove.className = "remove-button";
  edit.className = "edit-button";


  taskTitle.textContent = inputItemValue;
  const myDate = new Date();

  remove.onclick = function () {
    todoBox.remove();
  };

  edit.onclick = function () {
    taskTitle.contentEditable = "true";
    taskTitle.focus();
    edit.onclick = function () {
      taskTitle.contentEditable = "false";
      const newValue = taskTitle.textContent.trim();
      if (newValue === "") {
        alert("Please enter the text of the task.");
      }     
    };
  };

  if(addButton){
    const container = { id: (todos.length + 1), value: inputItemValue, myDate, Selection: selectionMode.value};
    initialTodos.push(container);
    todos.push(container);
    console.log(todos);
  }

  if (selectionMode.value) {
    status.textContent = selectionMode.value;
    status.classList.add(selectionMode.value);
  } 
  
  inputItemElement.value = "";
  selectionMode.value = "";
}
const selectionSort = document.getElementById("sort");



selectionSort.addEventListener("change" , function() {

  if (selectionSort.value === "Date") {    
    todos.sort((a, b) => b.myDate - a.myDate); 
  }
  else if (selectionSort.value === "Status"){
    let todoStatus = { "minor": 0, "normal": 1, "critical": 2 };
    todos.sort((a, b) => (todoStatus[b.Selection]) - (todoStatus[a.Selection])); 
  }
  else if (selectionSort.value === "Default"){
    todos = [...initialTodos];
  }

  renderTodos();
 })

function searchBox() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  if (query) {
    todos = initialTodos.filter(todo => {
    const words = todo.value.toLowerCase().split(" ");
   return words.some(w => w.startsWith(query)) || todo.value.toLowerCase().startsWith(query);
   });
  } 
  else {
    todos = [...initialTodos];
  }

  renderTodos();
}

function renderTodos() {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const todoBox = document.createElement("div");
    const remove = document.createElement("button");
    const edit = document.createElement("button");
    const status = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    const taskTitle = document.createElement("span");

    todoList.appendChild(todoBox);
    todoBox.appendChild(textDiv);
    textDiv.appendChild(taskTitle);
    buttonsDiv.appendChild(status);
    todoBox.appendChild(buttonsDiv);
    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(edit);

    textDiv.className = "textDiv";
    todoBox.className = "todo-box";
    status.className = "status-button";
    remove.className = "remove-button";
    edit.className = "edit-button";

    taskTitle.textContent = todo.value;
    if (todo.Selection) {      
      status.textContent = todo.Selection;
      status.classList.add(todo.Selection);
    }

    remove.onclick = function () {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos();
    };

    edit.onclick = function () {
      taskTitle.contentEditable = "true";
      // taskTitle.addEventListener("keydown", (e) => {
      //     console.log(e);
      // })
      taskTitle.focus();

      edit.onclick = function () {
        taskTitle.contentEditable = "false";
        const newValue = taskTitle.textContent.trim();
        
        if (newValue === "") {
          alert("Please enter the text of the task.");
        } else {
          todo.value = newValue;
        }
      };
    };
  });
}


