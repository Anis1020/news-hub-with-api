const newsCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data.news_category);
    });
};
// newsCategory();
const displayData = (data) => {
  data.forEach((element) => {
    console.log(element);
    const categoryDiv = document.getElementById("category_div");
    categoryDiv.innerHTML += `
    <a onclick="categoryId('${element.category_id} ', '${element.category_name}')" class="text-decoration-none" href="#">${element.category_name}</a>
    `;
  });
};

const categoryId = (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id} `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.length);
      document.getElementById("news_items").innerText = data.data.length;
      document.getElementById("news_title").innerText = category_name;
    });
};
