const formInput = document.querySelector("#inputBook");
const inputTitle = document.querySelector("#inputBookTitle");
const inputAuthor = document.querySelector("#inputBookAuthor");
const inputYear = document.querySelector("#inputBookYear");
const inputBookComplete = document.querySelector("#inputBookIsComplete");
const submitBtn = document.querySelector("#bookSubmit");

const searchForm = document.querySelector("#searchBook");
const searchInput = document.querySelector("#searchBookTitle");
const searchSubmit = document.querySelector("#searchSubmit");

const inCompleted = document.querySelector("#incompleteBookshelfList");
const complete = document.querySelector("#completeBookshelfList");

let title, author, year, isComplete;
let bookArr = [];
let bookStorage = localStorage.getItem("bookshelf") !== null ? JSON.parse(localStorage.getItem("bookshelf")) : [];

const addBook = (title, author, year, isComplete) => {
  let bookObject = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  bookStorage.push(bookObject);
  updateDom(bookStorage);
  updateStorage();
};

const updateDom = (item) => {
  inCompleted.innerHTML = "";
  complete.innerHTML = "";
  item.forEach((book) => {
    if (book.isComplete === true) {
      complete.innerHTML += `
      <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
  
        <div class="action">
            <button class="done" onclick="changeBook(${book.id})">Belum selesai di Baca</button>
            <button class="delete" onclick="deleteBook(${book.id})">Hapus buku</button>
        </div>
      </article>
      `;
    } else if (book.isComplete === false) {
      inCompleted.innerHTML += `
      <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
  
        <div class="action">
            <button class="done" onclick="changeBook(${book.id})">Selesai dibaca</button>
            <button class="delete" onclick="deleteBook(${book.id})">Hapus buku</button>
        </div>
      </article>
      `;
    }
  });
};

const searchBook = (term) => {
  let searchItem = term.trim().toLowerCase();
  let bookName = bookStorage.filter((book) => {
    return book.title.toString().toLowerCase() === searchItem;
  });
  updateDom(bookName);
  console.log(bookName, searchItem);
};

const changeBook = (id) => {
  let getBook = bookStorage.filter((book) => book.id === id);
  getBook[0].isComplete = !getBook[0].isComplete;
  updateDom(bookStorage);
  updateStorage();
};

const deleteBook = (id) => {
  bookStorage = bookStorage.filter((book) => book.id !== id);
  updateDom(bookStorage);
  updateStorage();
};

const updateStorage = () => {
  localStorage.setItem("bookshelf", JSON.stringify(bookStorage));
};

const initPage = () => {
  updateDom(bookStorage);
};

formInput.addEventListener("submit", (e) => {
  title = inputTitle.value;
  author = inputAuthor.value;
  year = inputYear.value;
  isComplete = inputBookComplete.checked;

  if (title === null || title === "") {
    alert("Masukkan judul untuk menambahkan buku");
  } else if (author === null || author === "") {
    alert("Masukkan nama pengarang untuk menambahkan buku");
  } else if (year === null || year === "") {
    alert("Masukkan tahun terbit untuk menambahkan buku");
  } else {
    addBook(title, author, year, isComplete);
  }

  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  inputBookComplete.checked = false;

  e.preventDefault();
});

searchForm.addEventListener("submit", (e) => {
  title = searchInput.value;

  if (title === null || title === "") {
    alert("Masukkan judul untuk mencari buku");
  } else {
    searchBook(title);
  }

  searchInput.value = "";

  e.preventDefault();
});

initPage();
