// fetch data dynamically form API
const loadData = (searchData) => {
  const url = `https://openlibrary.org/search.json?q=${searchData}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showResults(data));
};

// Search Button Part
document.getElementById("submit-btn").addEventListener("click", () => {
  const search = document.getElementById("search-input").value;
  spinner("block");
  // error handling
  if (search == "") {
    document.getElementById("no-result").innerText = "Please Enter Book Name";
    document.getElementById("no-result").style.display = "block";
    spinner("none");
  } else {
    document.getElementById("no-result").style.display = "none";
    document.getElementById("no-result").innerText = "No Books Found";
  }
  loadData(search);
  document.getElementById("search-input").value = "";
  document.getElementById("row").textContent = "";
  document.getElementById("total-books").style.display = "none";
});

const spinner = (displayType) => {
  document.getElementById("spinner").style.display = displayType;
};

// showing search results
const showResults = (data) => {
  // error handling
  if (data.numFound === 0) {
    document.getElementById("no-result").style.display = "block";
    spinner("none");
  } else {
    document.getElementById("no-result").style.display = "none";
  }
  const books = data.docs; // get books data
  const container = document.getElementById("row");
  container.textContent = "";
  let count = 0;
  books.slice(0, 30).forEach((book) => {
    spinner("none");
    const { cover_i, title, author_name, publisher, first_publish_year } = book;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 shadow rounded-3">
    <img src='https://covers.openlibrary.org/b/id/${cover_i}-M.jpg' class="card-img-top h-75 img-fluid"  alt="...">
    <div class="card-body">
      <h5 class="card-title"><span class="text-primary">Book Title:</span> ${title}</h5>
      <div class="card-text">
       <h5><span class="text-primary">Author Name:</span> ${
         author_name ? author_name : "No author name found"
       }</h5>
       <h5><span class="text-primary">Publisher:</span> ${
         publisher ? publisher : "No publisher name found"
       }</h5>
       <h5><span class="text-primary">First Publish Year:</span> ${
         first_publish_year ? first_publish_year : "No publish year found"
       }</h5>
      </div>
    </div>
  </div>
    `;
    count++;
    container.appendChild(div);
    document.getElementById("total-books").style.display = "block";
    document.getElementById("total-search-books").innerText = books.length;
    document.getElementById("search-books").innerText = count;
  });
};
