const newsCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data.news_category);
    });
};

const displayData = (data) => {
  const categoryDiv = document.getElementById("category_div");
  data.forEach((element) => {
    console.log(element);
    categoryDiv.innerHTML += `
    <a onclick="categoryId('${element.category_id} ', '${element.category_name}'), displayAllNews()" class="text-decoration-none" href="#">${element.category_name}</a>
    `;
  });
};

const categoryId = (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id} `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      displayAllNews(data.data, category_name);
    });
};

// display all news
const displayAllNews = (data, category_name) => {
  document.getElementById("news_items").innerText = data.length;
  document.getElementById("news_title").innerText = category_name;
  // console.log(data);
  const cardContainer = document.getElementById("news_card");
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    console.log(item);
    const { _id, title, details, author } = item;
    cardContainer.innerHTML += `
      <div class="card mb-3 mt-4">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${
                item.image_url
              } class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <div class="card-body ms-2>
                
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                  ${details.slice(0, 190)}.....
                </p>
              
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-3">
                
                <img src=${
                  author.img
                } class="img-fluid rounded-circle" height="40px" width="40px" alt="..." />
                <div>
                <p class="m-0 p-0">${
                  item.author.name ? item.author.name : "Not found"
                }</p>
                <p class="m-0 p-0">${item.author.published_date}</p>
                </div>
                </div>
                <div>
                <span>${item.total_view}</span>
                <i class="fas fa-eye"></i>
                </div>
                <div>
                <i class="fas fa-star"></i>
                </div>
                <div>
                
                <i class="fas fa-arrow-right" onclick="showDetailInModal('${_id}')"></i>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      `;
  });
};

// open modal
const showDetailInModal = (news_id) => {
  // data-bs-target="#exampleModal"
  let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data[0]);
    });
};
