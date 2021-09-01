const loadData = (searchData) => {
  const url = `http://openlibrary.org/search.json?q=${searchData}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showResults(data));
};

document.getElementById("submit-btn").addEventListener("click", () => {
  const search = document.getElementById("search-input").value;
  spinner("block");
  if (search == "") {
    document.getElementById("no-result").style.display = "none";
    error("block");
    spinner("none");
  } else {
    document.getElementById("no-result").style.display = "none";
    error("none");
  }
  loadData(search);
  document.getElementById("search-input").value = "";
  document.getElementById("row").textContent = "";
  document.getElementById("total-books").style.display = "none";
});

const error = (displayType) => {
  document.getElementById("error").style.display = displayType;
};
const spinner = (displayType) => {
  document.getElementById("spinner").style.display = displayType;
};

const showResults = (data) => {
  if (data.numFound === 0) {
    document.getElementById("no-result").style.display = "block";
    spinner("none");
    error("none");
    document.getElementById("search-books").innerText = 0;
  } else {
    document.getElementById("no-result").style.display = "none";
  }
  const books = data.docs;
  const container = document.getElementById("row");
  container.textContent = "";
  document.getElementById("search-books").innerText = 0;
  //   console.log(books.length);
  books.forEach((book) => {
    spinner("none");
    const { title, author_name, publisher, first_publish_year, cover_i } = book;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 shadow rounded-3">
    <img src='https://covers.openlibrary.org/b/id/${cover_i}-M.jpg' class="card-img-top h-75 img-fluid"  alt="...">
    <div class="card-body">
      <h5 class="card-title"><span class="text-primary">Book Title:</span> ${title}</h5>
      <div class="card-text">
       <h5><span class="text-primary">Author Name:</span> ${
         author_name ? author_name : "Not Found"
       }</h5>
       <h5><span class="text-primary">Publisher:</span> ${
         publisher ? publisher : "Not Found"
       }</h5>
       <h5><span class="text-primary">First Publish Year:</span> ${
         first_publish_year ? first_publish_year : "Not Found"
       }</h5>
      </div>
    </div>
  </div>
    `;
    container.appendChild(div);
    document.getElementById("total-books").style.display = "block";
    document.getElementById("search-books").innerText = books.length;
  });
};
