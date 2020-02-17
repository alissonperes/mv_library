let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  let book = new Book(author, title, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("C.S. Lewis", "Narnia", 200, false);
addBookToLibrary("Isaac Asmiov", "I, Robot", 50, false);

let render = function(template, node) {
  node.innerHTML += template;
};

let shelf = document.getElementById("shelf");

for (var i = 0; i < myLibrary.length; i++) {
  let newBook = `<div
    class="col-sm-2 d-flex align-items-stretch card book text-white m-2"
  >
    <div
      class="card-body text-center d-flex flex-column justify-content-between"
    >
      <h5 class="card-title col">${myLibrary[i].title}</h5>
      <p class="card-text">by</p>
      <p class="card-text">${myLibrary[i].author}</p>
      <p class="card-text">${myLibrary[i].pages} pages</p>
      <p class="card-text">${
        myLibrary[i].read ? "Already read" : "Not read yet"
      }</p>
    </div>
  </div>`;
  render(newBook, shelf);
}
