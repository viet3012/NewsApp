"use strict";

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// Chuyển từ JS Object sang Class Instance
const userArr = users.map((user) => parseUser(user));

let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// Lấy dữ liệu todoArr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
//Chuyển từ JS Object sang Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}

function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
