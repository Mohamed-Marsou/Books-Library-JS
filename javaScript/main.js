const overlay = document.querySelector(".overlay");
const closeBtnModule = document.querySelector(".add__moudle_box > span");
const moduleContainer = document.querySelector(".add__moudle_box");
const allBooksContainer = document.querySelector(".books__modules");
const addNewBook = document.querySelector(".add__new__book");

//popup card
const bookTitle = document.getElementById("title");
const bookAuth = document.getElementById("auth");
const bookPages = document.getElementById("pages");
const isRead = document.getElementById("read");
const addBtn = document.getElementById("add_new__boook");

function addActiveClass() {
  overlay.classList.add("active");
  moduleContainer.classList.add("active");
}
function removeActiveClass() {
  overlay.classList.remove("active");
  moduleContainer.classList.remove("active");
}

addNewBook.addEventListener("click", () => {
  addActiveClass();
});
overlay.addEventListener("click", () => {
  removeActiveClass();
});
closeBtnModule.addEventListener("click", () => {
  removeActiveClass();
});

let myLibrary = [];
function Book(id, title, auth, pages, read) {
  this.id = id;
  this.title = title;
  this.auth = auth;
  this.pages = pages;
  this.read = read;
}
if (localStorage.getItem("myLibrary") === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem("myLibrary"));
  myLibrary = booksFromStorage;
}
function addBook() {
  addBtn.addEventListener("click", () => {
    let newBook = new Book(
      new Date().getMilliseconds() * 1.02,
      `${bookTitle.value}`,
      `${bookAuth.value}`,
      `${bookPages.value}`,
      `${isRead.checked}`
    );
    myLibrary.push({ ...newBook });

    allBooksContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="expml_module">
          <h2>Title : <small>
          ${bookTitle.value}
          </small>
          </h2>
          <h2>Author :<small>${bookAuth.value}</small></h2>
          <h2>Pages : <small>${bookPages.value}</small></h2>

          <div class="readNotRead" ><button id="bookStt" >${
            isRead == "true" ? "READ" : "Yet to read"
          }</button></div>
          <div class="Remove"><button id="deleteBook">Remove</button></div>
        </div>`
    );
    bookTitle.value = "";
    bookAuth.value = "";
    bookPages.value = "";
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    removeActiveClass();
  });
}

function displayBooks() {
  let getBooks = localStorage.getItem("myLibrary");
  let myBooks = JSON.parse(getBooks);
  if (localStorage.getItem("myLibrary")) {
    myBooks.map((el) => {
      allBooksContainer.insertAdjacentHTML(
        "afterbegin",
        `<div class="expml_module">
          <h2>Title : <small>${el.title}</small></h2>
          <h2>Author : <small>${el.auth}</small></h2>
          <h2>Pages : <small>${el.pages}</small></h2>

          <div class="readNotRead" ><button id="bookStt" >${
            el.read == "true" ? "READ" : "Yet to read"
          }</button></div>
          <div class="Remove"><button id="deleteBook" onClick="deletingBook(${
            el.id
          })">Remove</button></div>
        </div>`
      );
    });
  }
}

let allPagesRead = [];

function sideBarInfo() {
  const totalBooks = document.getElementById("total_b");
  const totalRead = document.getElementById("total_read");
  const totalPagesRead = document.getElementById("total_pages");
  let allPagesRead = [];
  let allBooksRead = 0;

  let getBooks = localStorage.getItem("myLibrary");
  let myBooks = JSON.parse(getBooks);

  if (myBooks === null) {
    return;
  } else {
    myBooks.filter((obj) => {
      if (obj.read == "true") {
        allPagesRead.push(Number(obj.pages));
      }
    });
    const sum = allPagesRead.reduce(add, 0);

    function add(accumulator, a) {
      return accumulator + a;
    }
    totalPagesRead.textContent = sum;
  }

  myBooks.map((book, i) => {
    totalBooks.textContent = i + 1;
    if (book.read === "true") {
      allBooksRead = allBooksRead + 1;
      totalRead.textContent = +totalRead.textContent + 1;
    }
  });
}

//*DELETE A BOOK+
const deletingBook = (id) => {
  const deleteBook = document.getElementById("deleteBook");
  console.log(id);
  const LSBooks = JSON.parse(localStorage.getItem("myLibrary"));
  console.log(LSBooks);
  const newBooks = LSBooks.filter((book) => book.id != id);
  console.log(newBooks);
  localStorage.setItem("myLibrary", JSON.stringify(newBooks));
  location.reload();
};
addBook();
displayBooks();
sideBarInfo();
