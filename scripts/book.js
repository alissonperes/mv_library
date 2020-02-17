let myLibrary = [];
let shelf = document.getElementById("shelf");
let index = 0;

let render = function(template, node) {
  node.innerHTML += template;
};

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.index = index++;
}

function addBookToLibrary(author, title, pages, read) {
  let book = new Book(author, title, pages, read);
  let newBook = `<div
    class="col-sm-2 d-flex align-items-stretch card book text-white m-2"
  >
    <div
      class="card-body text-center d-flex flex-column justify-content-between"
    >
      <h5 class="card-title col">${title}</h5>
      <p class="card-text">by</p>
      <p class="card-text">${author}</p>
      <p class="card-text">${pages} pages</p>
      <p class="card-text">${read ? "Already read" : "Not read yet"}</p>
    </div>
  </div>`;
  render(newBook, shelf);
  myLibrary.push(book);
}

function createFromForm(form) {
  author = form.author.value;
  title = form.title.value;
  pages = parseInt(form.pages.value);
  read = form.read.checked;

  addBookToLibrary(author, title, pages, read);
  form.reset()
}

addBookToLibrary("C.S. Lewis", "Narnia", 200, false);
addBookToLibrary("Isaac Asmiov", "I, Robot", 50, false);
