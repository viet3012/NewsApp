"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

let totalResults = 0;

getNews("us", 1);
// Hàm lấy tin tức
async function getNews(country, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=731cc2126954487a90af4a258915ac88`
    );
    const data = await res.json();
    displayNewList(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Hàm hiển thị tin tức
function displayNewList(data) {
  totalResults = data.totalResults;
  checkBtnNext();
  checkBtnPrev();
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
  getNews("us", --pageNum.textContent);
});

// Thêm sự kiện cho nút Next
btnNext.addEventListener("click", function () {
  getNews("us", ++pageNum.textContent);
});
