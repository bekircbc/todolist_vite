import "./style.css";
const url = "http://localhost:5011/todos";
// const loginUrl = "http://localhost:5011/logins";
const appElem = document.querySelector("#app");

const getTodos = async () => {
  const response = await fetch(url);
  return response.json();
};

const todos = await getTodos();

appElem.innerHTML = `
  <h1>Todos</h1>
  <div>There are ${todos.length} todos.</div>
  <div class="todos"></div>
  <div><button class="btnAdditem">Add Item</button></div>
  <div><button class="btnDeleteitem">Delete Item</button></div>
`;

const todosElem = document.querySelector(".todos");
const btnDeleteitem = document.querySelector(".btnDeleteitem");

todos.map((m) => {
  todosElem.innerHTML += `<div class="todoItem">Subject : ${m.subject}<span> Todo : ${m.todo}</span> </div>`;
});

const btnAdditem = document.querySelector(".btnAdditem");

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // return await response.json();
};

const deleteData = async (url, id) => {
  const response = await fetch(url + `/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

// deleteData(url, 5);

// customers.forEach((todo) => {
//   addItem(todo, "customers");
// });
// // orders.forEach((order) => {
// //   addItem(order, "orders");
// // });
let newSubject, newTodo, newData, deleteSubject, deleteTodo;

btnAdditem.addEventListener("click", async (e) => {
  e.preventDefault();
  appElem.innerHTML = `
  <h1>Todos</h1>
  <form class="form">
  <input class="form__input newSubject " type="text" >
  <label class="form-label">Enter your Subject</label>
  <input class="form__input newTodo" type="text">

  <label class="form-label">Enter your Todo</label>
  <button type="submit" class="btnFormAdditem form__btn">Add Item</button>

  </form>
  `;
  newSubject = document.querySelector(".newSubject").value;
  newTodo = document.querySelector(".newTodo").value;

  const btnFormAdditem = document.querySelector(".btnFormAdditem");

  btnFormAdditem.addEventListener("click", async (e) => {
    e.preventDefault();
    newData = { subject: newSubject, todo: newTodo };
    postData(url, newData);
  });
});

btnDeleteitem.addEventListener("click", async (e) => {
  e.preventDefault();
  appElem.innerHTML = `
  <h1>Todos</h1>
  <form class="form">
  <input class="form__input deletSubject " type="text" >
  <label class="form-label">Enter your Subject</label>
  <input class="form__input deleteTodo" type="text">

  <label class="form-label">Enter your Todo</label>
  <button type="submit" class="btnFormAdditem form__btn">Delete Item</button>

  </form>
  `;
  deleteSubject = document.querySelector(".deleteSubject").value;
  deleteTodo = document.querySelector(".deleteTodo").value;
  const deleteObject = todos.find((m) => {
    m.subject === deleteSubject && m.todo === deleteTodo;
  });
  const id = deleteObject.id;

  const btnFormAdditem = document.querySelector(".btnFormAdditem");

  btnFormAdditem.addEventListener("click", async (e) => {
    e.preventDefault();
    // newData = { subject: newSubject, todo: newTodo };
    deleteData(url, id);
  });
});

// btnDeleteitem.addEventListener("click",async (e) => {
//   e.preventDefault();

//   deleteData();
// });

// deleteMessage(5);
