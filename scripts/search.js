"use strict";

const navPageNum = document.getElementById("nav-page-num");
const inputQuery = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const newsContainer = document.getElementById("news-container");

let totalResults = 0;
let keywords = "";
navPageNum.style.display = "none";

// Thêm sự kiện cho nút search
btnSearch.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";
  // Kiểm tra xem đã nhập keyword chưa
  if (inputQuery.value.trim().length === 0) {
    navPageNum.style.display = "none";
    alert("Nhập từ khoá để tìm kiếm !");
  } else {
    keywords = inputQuery.value;
    getDataNewsByKeywords(keywords, 1);
  }
});

// Hàm bất đồng bộ để lấy dữ liệu tin tức được tìm kiếm từ keywords
async function getDataNewsByKeywords(keywords, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=731cc2126954487a90af4a258915ac88`
    );
    const data = await res.json();
    // Thông báo nếu không tìm được bài viết
    if (data.totalResults == 0) {
      navPageNum.style.display = "none";
      throw new Error("Không có bài viết phù hợp với từ khóa đang tìm kiếm !");
    }
    navPageNum.style.display = "block";
    displayNewList(data);
  } catch (err) {
    alert(err.message);
  }
}

// Hàm kiểm tra điều kiện nút Prev
function checkBtnPrev() {
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}

// Hàm kiểm tra điều kiện nút Next
function checkBtnNext() {
  if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

// Thêm sự kiện cho nút Prev
btnPrev.addEventListener("click", function () {
  getDataNewsByKeywords(keywords, --pageNum.textContent);
});

// Thêm sự kiện cho nút Next
btnNext.addEventListener("click", function () {
  getDataNewsByKeywords(keywords, ++pageNum.textContent);
});

// Hàm hiển thị tin tức lên trang
function displayNewList(data) {
  totalResults = data.totalResults;
  checkBtnPrev();
  checkBtnNext();
  let html = "";
  data.articles.forEach(function (article) {
    html += `<div class="card flex-row flex-wrap">
                <div class="card mb-3" style="">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <img src=${
                        article.urlToImage ? article.urlToImage : "no_image.jpg"
                      } class="card-img" alt="img" height="250px">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <button><a href=${
                          article.url
                        } target="_blank">View</a></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  });
  newsContainer.innerHTML = html;
}
