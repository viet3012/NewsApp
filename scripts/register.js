"use strict";

const firstnameEl = document.getElementById("input-firstname");
const lastnameEl = document.getElementById("input-lastname");
const usernameEl = document.getElementById("input-username");
const passwordEl = document.getElementById("input-password");
const confirmPasswordEl = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

// Thêm sự kiện cho nút register
btnRegister.addEventListener("click", function () {
  const user = {
    firstname: firstnameEl.value,
    lastname: lastnameEl.value,
    username: usernameEl.value,
    password: passwordEl.value,
    confirmPassword: confirmPasswordEl.value,
  };
  const validate = validateUser(user);
  if (validate) {
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công !");
    window.location.href = "../pages/login.html";
  }
});

// Hàm validate dữ liệu
function validateUser(user) {
  let isValidate = true;
  if (user.firstname.trim() === "") {
    alert("Hãy nhập firstname !");
    isValidate = false;
  }
  if (user.lastname.trim() === "") {
    alert("Hãy nhập lastname !");
    isValidate = false;
  }
  if (user.username.trim() === "") {
    alert("Hãy nhập username !");
    isValidate = false;
  }
  if (user.password.trim() === "") {
    alert("Hãy nhập password !");
    isValidate = false;
  }
  if (user.confirmPassword.trim() === "") {
    alert("Hãy nhập confirm password !");
    isValidate = false;
  }
  if (user.password !== user.confirmPassword) {
    alert("Password và confirm password phải giống nhau !");
    isValidate = false;
  }
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 kí tự !");
    isValidate = false;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      alert("Username đã được sử dụng !");
      isValidate = false;
      break;
    }
  }
  return isValidate;
}
