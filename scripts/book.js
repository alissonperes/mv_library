let myLibrary = [];

const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const get = key => localStorage.getItem(key);
const remove = key => localStorage.removeItem(key);

let shelf = document.getElementById("shelf");
get('index') || set('index', 0)

let render = function(template, node) {
  node.innerHTML += template;
};

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.index = get('index');
  set("index", parseInt(get("index")) + 1);
  this.toggleRead = function() {
    this.read = !this.read;
    toggleButton(this.index);
  };
}

function addBookToLibrary(book) {
  if (book.author && book.title) {
    let newBook = `<div
    class="col-sm-2 d-flex align-items-stretch card book text-white m-2" id="book${book.index}"
    >
    <div
    class="card-body text-center d-flex flex-column justify-content-between"
    >
    <h5 class="card-title col">${book.title}</h5>
    <p class="card-text">by</p>
    <p class="card-text">${book.author}</p>
    <p class="card-text">${book.pages} pages</p>
    <p class="card-text"><button id="btnBook${book.index}" type="button" class="btn btn-secondary" onclick="myLibrary[${book.index}].toggleRead();">${
      book.read ? "Read" : "Unread"
    }</button></p>
    </div>
    <button class="btn btn-primary" onclick="removeBookFromLibrary(${get(`index`)})"> Remove </button>
    </div>`;

    render(newBook, shelf);
  } else {
    alert("Author and title needed to create book");
  }
}

function removeBookFromLibrary(bookIndex) {
  delete myLibrary[bookIndex];
  remove(`book${bookIndex}`);
  let removeBook = document.getElementById("book" + bookIndex);
  removeBook.remove();
}

function createFromForm(form) {
  author = form.author.value;
  title = form.title.value;
  pages = form.pages.value ? parseInt(form.pages.value) : "unknown";
  read = form.read.checked;
  let book = new Book(author, title, pages, read);
  set(`book${book.index}`, book);
  addBookToLibrary(book);
  form.reset();
}

function toggleButton(index) {
  let parsed = JSON.parse(get(index)).read;
  parsed = parsed == true ? false : true;
  console.log(parsed);
  let btn = document.getElementById("btnBook" + index);
  btn.innerText = btn.innerText == "Read" ? "Unread" : "Read";
  localStorage.set(index, )
}

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  for (const key in localStorage) {
    try {
      if (typeof (JSON.parse(localStorage[key])) == 'object') {
        let add = (JSON.parse(localStorage[key]))
        console.log(add)
        addBookToLibrary(add)
      }
    }
    catch(error){
    }
  }
});
