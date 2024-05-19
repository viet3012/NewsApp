"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

// Hàm hiển thị để biết người dùng đã đăng nhập chưa
function displayHome() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${currentUser.firstname}`;
  } else {
    mainContent.style.display = "none";
    loginModal.style.display = "block";
  }
}

// Thêm sự kiện cho nút logout
btnLogout.addEventListener("click", function () {
  currentUser = null;
  saveToStorage("currentUser", currentUser);
  displayHome();
});
