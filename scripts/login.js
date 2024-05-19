"use strict";

const usernameEl = document.getElementById("input-username");
const passwordEl = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// Thêm sự kiện cho nút login
btnLogin.addEventListener("click", function () {
  const validate = validateUser();
  if (validate) {
    const user = userArr.find(
      (item) =>
        item.username === usernameEl.value && item.password === passwordEl.value
    );
    if (user) {
      alert("Đăng nhập thành công !");
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập sai !");
    }
  }
});

// Hàm validate dữ liệu đăng nhập
function validateUser() {
  let isValidate = true;
  if (usernameEl.value === "") {
    alert("Hãy nhập username !");
    isValidate = false;
  }
  if (passwordEl.value === "") {
    alert("Hãy nhập password !");
    isValidate = false;
  }
  return isValidate;
}
