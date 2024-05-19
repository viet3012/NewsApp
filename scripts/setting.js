"use strict";

const pageSizeEl = document.getElementById("input-page-size");
const categoryEl = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");

// Thêm sự kiện cho nút save
btnSave.addEventListener("click", function () {
  if (validate()) {
    // Cập nhật lại currentUser
    currentUser.pageSize = Number.parseInt(pageSizeEl.value);
    currentUser.category = categoryEl.value;
    saveToStorage("currentUser", currentUser);
    // Cập nhật lại userArr
    const index = userArr.findIndex(
      (userItem) => userItem.username === currentUser.username
    );
    userArr[index] = currentUser;
    saveToStorage("userArr", userArr);
    // Thông báo cài đặt thành công và reset form nhập
    alert("Cài đặt thành công !");
    pageSizeEl.value = "";
    categoryEl.value = "General";
  }
});

// Hàm validate dữ liệu người dùng
function validate() {
  let isValidate = true;
  if (pageSizeEl.value === "") {
    alert("Hãy nhập news per page !");
    isValidate = false;
  }
  if (Number.parseInt(pageSizeEl.value) < 1) {
    alert("News per page không hợp lệ !");
    isValidate = false;
  }
  return isValidate;
}
