/*function $(selector) {
    return document.querySelector(selector);
}

class Todo {
    #key;
    #title;
    #done;

    constructor(title) {
        this.#key = +Math.random();
        this.#title = title;
        this.#done = false;
    }

    set done(isDone) {
        this.#done = isDone;
    }

    get key() {
        return this.#key;
    }

    get title() {
        return this.#title;
    }

    get done() {
        return this.#done;
    }

    get json() {
        return {
            key: this.#key,
            title: this.#title,
            done: this.#done
        };
    }
}

const todoForm = $('#todo-form');
const todoInput = $('#todo-input');
const todoListElm = $('#todo-list');
let todoList = {};

window.addEventListener('load', () => {
    const savedData = localStorage.getItem('todo-list');
    if (savedData) {
        todoList = JSON.parse(savedData);
        renderTodos();
    }
}, false);

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const inputValue = todoInput.value;
    if (!inputValue) return;
    const newTodo = new Todo(inputValue);
    todoList[newTodo.key] = newTodo.json;
    renderTodos();
    e.target.reset();
});

function createTodoElement(todo) {
    const todoArticle = document.createElement('article');
    todoArticle.classList.add('todo');
    todoArticle.setAttribute('data-checked', todo.done ? 'checked' : 'unchecked');
    todoArticle.setAttribute('data-key', todo.key);

    const checkButton = document.createElement('button');
    checkButton.addEventListener('click', () => handleCheckTodo(todo.key));
    checkButton.innerHTML = `<i class="fa-regular fa-circle unchecked"></i>
    <i class="fa-solid fa-circle-check delete-todo checked"></i>`;

    const todoTitle = document.createElement('span');
    todoTitle.textContent = todo.title;
    todoTitle.setAttribute('title', todo.title);

    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => handleDeleteTodo(todo.key));
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    todoArticle.appendChild(checkButton);
    todoArticle.appendChild(todoTitle);
    todoArticle.appendChild(deleteButton);

    return todoArticle;
}

function renderTodos() {
    todoListElm.innerHTML = '';

    for (const key of Object.keys(todoList)) {
        const todo = todoList[key];
        const todoElm = createTodoElement(todo);
        todoListElm.appendChild(todoElm);
    }

    localStorage.setItem('todo-list', JSON.stringify(todoList));
}

function handleCheckTodo(key) {
    todoList[key].done = !todoList[key].done;
    renderTodos();
}

function handleDeleteTodo(key) {
    delete todoList[key];
    renderTodos();
}*/



/*const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todolist');

const addTodo = ()=> {
    const inputText = inputBox.ariaValueMax.trim();
    if(inputText.length <=0)
    {
        alert("you must write something in your to do");
        return false;
    }
    //Creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //Creating Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    li.appenedChild(deleteBtn);

    //Creating Edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "edit";
    editBtn.classList.add("btn","editBtn");
    li.appenedChild(editBtn);

    todoList.appendChild(li);
    inputBox.value ="";
}

const updateTodo =(e) =>{
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
    }
   // console.log(e.target.innerHTML);

   if(e.target.innerHTML === "Edit")
   {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value ="Edit";
   }
}


addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);*/


const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        //Creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);


        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            //Creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            // Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Creating Delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);