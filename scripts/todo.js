"use strict";

const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");

displayTodoList();

// Hàm hiển thị danh sách todo
function displayTodoList() {
  let html = "";
  todoArr
    .filter((todo) => todo.owner === currentUser.username)
    .forEach(function (todo) {
      html += `
        <li class=${todo.isDone ? "checked" : ""} >${
        todo.task
      }<span class = "close">x</span></li>`;
    });
  todoList.innerHTML = html;
  ToggleTasks();
  DeleteTasks();
}
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(0, -1));
// Thêm sự kiện cho nút add
btnAdd.addEventListener("click", function () {
  if (inputTask.value.trim().length === 0) {
    alert("Hãy nhập nhiệm vụ !");
  } else {
    const todo = new Task(inputTask.value, currentUser.username, false);
    todoArr.push(todo);
    saveToStorage("todoArr", todoArr);
    displayTodoList();
    inputTask.value = "";
  }
});

// Hàm toggle (check nhiệm vụ đã làm hay chưa)
function ToggleTasks() {
  document.querySelectorAll("#todo-list li").forEach(function (liEl) {
    liEl.addEventListener("click", function (e) {
      if (e.target !== liEl.children[0]) {
        liEl.classList.toggle("checked");
        const todo = todoArr.find(
          (todoItem) =>
            todoItem.owner === currentUser.username &&
            todoItem.task === liEl.textContent.slice(0, -1)
        );
        todo.isDone = liEl.classList.contains("checked") ? true : false;
        saveToStorage("todoArr", todoArr);
      }
    });
  });
}

// Hàm delete (xoá nhiệm vụ)
function DeleteTasks() {
  document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
    closeEl.addEventListener("click", function () {
      const index = todoArr.findIndex(
        (item) =>
          item.owner === currentUser.username &&
          item.task === closeEl.parentElement.textContent.slice(0, -1)
      );
      todoArr.splice(index, 1);
      saveToStorage("todoArr", todoArr);
      displayTodoList();
    });
  });
}
