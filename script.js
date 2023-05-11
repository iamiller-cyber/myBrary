function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
};

let myLibrary = [];
let myWishList = [];

let bookOne = {
  title: "Blood Meridien",
  author: "Cormak McKarthy",
  pages: 34,
  read: true,
};

myLibrary.push(bookOne);

const lib = document.getElementById("library");
const t = document.getElementById("title");
const a = document.getElementById("author");
const p = document.getElementById("pages");
const checkRead = document.getElementById("read");
const checkWish = document.getElementById("wishlist");
const bc = document.getElementsByClassName("bookcard");
const sub = document.getElementById("sub");
const totalBooks = document.getElementById("bookNum");
const totalPages = document.getElementById("pageNum");

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const pagesDiv = document.createElement("p");
  const deleteButton = document.createElement("button");
  const readButton = document.createElement("button");

  titleDiv.textContent = `${book.title}`;
  authorDiv.textContent = `${book.author}`;
  pagesDiv.textContent = `${book.pages}`;

  deleteButton.classList.add("delete");
  deleteButton.setAttribute("data-index", myLibrary.indexOf(book));
  deleteButton.addEventListener("click", removeCard);

  book.read === true
    ? readButton.classList.add("read")
    : readButton.classList.add("unread");
  readButton.setAttribute("data-index", myLibrary.indexOf(book));
  readButton.addEventListener("click", readBook);

  bookCard.appendChild(titleDiv);
  bookCard.appendChild(authorDiv);
  bookCard.appendChild(pagesDiv);
  bookCard.appendChild(readButton);
  bookCard.appendChild(deleteButton);
  bookCard.classList.add("bookcard");
  lib.appendChild(bookCard);
}

function displayBooks() {
  eraseBooks();
  myLibrary.forEach((book) => createBookCard(book));
  totalBooks.textContent = `${myLibrary.length}`;
}

function eraseBooks() {
  Array.from(bc).forEach((card) => {
    lib.removeChild(card);
  });
}

function removeCard(e) {
  myLibrary.splice(e.target.dataset.index, 1);
  displayBooks();
}

function addBook(e) {
  e.preventDefault();
  if (t.value == "" || a.value == "" || p.value == "") {
    return;
  }
  let book = {
    title: t.value,
    author: a.value,
    pages: p.value,
  };
  if (checkRead.checked) {
    book.read = true;
  } else book.read = false;
  if (checkWish.checked) {
    myWishList.push(book);
  } else myLibrary.push(book);
  document.forms[0].reset();
}

document.addEventListener("DOMContentLoaded", () => {
  sub.addEventListener("click", addBook);
  sub.addEventListener("click", displayBooks);
});

function readBook(e) {
  if (e.target.classList.contains("read")) {
    e.target.classList.replace("read", "unread");
    myLibrary[e.target.data.index].read = false;
  } else {
    e.target.classList.replace("unread", "read");
    myLibrary[e.target.data.index].read = true;
  }
}
