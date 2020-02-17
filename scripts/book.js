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
addBookToLibrary('Isaac Asmiov', 'I, Robot', 50, false);
console.log(myLibrary);