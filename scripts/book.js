const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const get = key => localStorage.getItem(key);
const remove = key => localStorage.removeItem(key);

const shelf = document.getElementById('shelf');
const formErrors = document.getElementById('form_errors');

if (get('index') == null) {
  set('index', 0);
}

const render = function render(template, node) {
  node.innerHTML += template;
};

function addBookToLibrary(book) {
  formErrors.innerHTML = '';
  set(`book${book.index}`, book);
  const newBook = `<div
    class="col-xl-3 col-lg-4 d-flex align-items-stretch card book text-white m-2" id="book${
  book.index
}"
    >
    <div
    class="card-body text-center d-flex flex-column justify-content-between"
    >
    <h5 class="card-title col">${book.title}</h5>
    <p class="card-text">by</p>
    <p class="card-text">${book.author}</p>
    <p class="card-text">${book.pages} pages</p>
    <p class="card-text"><button id="btnBook${
  book.index
}" type="button" class="btn btn-secondary" onclick="toggleButton(${book.index})">${
  book.read ? 'Read' : 'Unread'
}</button></p>
    </div>
    <button class="btn btn-primary" onclick="removeBookFromLibrary(${book.index})"> Remove </button>
    </div>`;

  render(newBook, shelf);
}

function renderErrorForm() {
  const errorMessage = '<p>You need to fill Author and Title!</p>';
  formErrors.innerHTML = errorMessage;
}
/* eslint-disable */
function removeBookFromLibrary(bookIndex) {
  remove(`book${bookIndex}`);
  document.getElementById(`book${bookIndex}`).remove();
}
/* eslint-enable */
function toggleButton(index) {
  const parsed = JSON.parse(get(`book${index}`));
  parsed.read = parsed.read !== true;
  set(`book${index}`, parsed);
  const btn = document.getElementById(`btnBook${index}`);
  btn.innerText = btn.innerText === 'Read' ? 'Unread' : 'Read';
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.index = get('index');
  set('index', parseInt(get('index'), 10) + 1);
  this.toggleRead = function toggleRead() {
    this.read = !this.read;
    toggleButton(this.index);
  };
}
/* eslint-disable */
function createFromForm(form) {
  // function used on button onclick html file line: 36
  if (form.author.value && form.title.value) {
    const author = form.author.value;
    const title = form.title.value;
    const pages = form.pages.value ? parseInt(form.pages.value, 10) : 'unknown';
    const read = form.read.checked;
    const book = new Book(author, title, pages, read);
    addBookToLibrary(book);
    form.reset();
  } else {
    renderErrorForm();
  }
}
/* eslint-enable */
function ready() {
  Object.keys(localStorage).map(x => {
    if (typeof JSON.parse(localStorage[x]) === 'object') {
      const add = JSON.parse(localStorage[x]);
      addBookToLibrary(add);
    }
    return null;
  });
}

if (document.readyState !== 'loading') {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', ready);
}
