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
  this.toggleRead = function() {
    this.read = !this.read;
    toggleButton(this.index);
  };
}

function addBookToLibrary(author, title, pages, read) {
  if (author && title) {
    let newBook = `<div
    class="col-sm-2 d-flex align-items-stretch card book text-white m-2" id="book${index}"
    >
    <div
    class="card-body text-center d-flex flex-column justify-content-between"
    >
    <h5 class="card-title col">${title}</h5>
    <p class="card-text">by</p>
    <p class="card-text">${author}</p>
    <p class="card-text">${pages} pages</p>
    <p class="card-text"><button id="btnBook${index}" type="button" class="btn btn-secondary" onclick="myLibrary[${index}].toggleRead();">${
      read ? "Read" : "Unread"
    }</button></p>
    </div>
    <button class="btn btn-primary" onclick="removeBookFromLibrary(${index})"> Remove </button>
    </div>`;
    let book = new Book(author, title, pages, read);
    render(newBook, shelf);
    myLibrary.push(book);
  } else {
    alert("Author and title needed to create book");
  }
}

function removeBookFromLibrary(bookIndex) {
  delete myLibrary[bookIndex];
  let removeBook = document.getElementById("book" + bookIndex);
  removeBook.remove();
}

function createFromForm(form) {
  author = form.author.value;
  title = form.title.value;
  pages = form.pages.value ? parseInt(form.pages.value) : "unknown";
  read = form.read.checked;

  addBookToLibrary(author, title, pages, read);
  form.reset();
}

function toggleButton(index) {
  let btn = document.getElementById("btnBook" + index);
  btn.innerText = btn.innerText == "Read" ? "Unread" : "Read";
}

addBookToLibrary("C.S. Lewis", "Narnia", 200, false);
addBookToLibrary("Isaac Asmiov", "I, Robot", 50, false);