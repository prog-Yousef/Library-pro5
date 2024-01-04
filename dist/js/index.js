var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// variables
const booksContainer = document.getElementById("booksContainer");
const Modal = document.getElementById("Modal");
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const ModalContent = document.getElementById("Modal-content-inner");
const ModalClose = document.getElementById("Modal-close");
const books = [];
// fetch data from api
function fetchDataBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            books.length = 0;
            books.push(...yield response.json());
            yield showBooks("");
            console.log(fetchDataBooks);
        }
        catch (error) {
            console.error(`Error fetching books: ${error}`);
        }
    });
}
// Function to display books 
function showBooks(searchResults) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!booksContainer) {
            return;
        }
        booksContainer.innerHTML = '';
        const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchResults.toLowerCase()));
        filteredBooks.forEach((book) => {
            const bookCard = createBookContent(book);
            booksContainer.appendChild(bookCard);
        });
    });
}
// Function to create elements
function createBookContent(book) {
    const bookWrapper = document.createElement("div");
    bookWrapper.classList.add("book");
    if (book.color) {
        bookWrapper.style.backgroundColor = book.color;
    }
    const titleElement = document.createElement("div");
    titleElement.classList.add("book-title");
    titleElement.textContent = book.title;
    const authorElement = document.createElement("div");
    authorElement.classList.add("book-author");
    authorElement.textContent = book.author;
    bookWrapper.appendChild(titleElement);
    bookWrapper.appendChild(authorElement);
    bookWrapper.addEventListener("click", () => showBookDetails(book));
    return bookWrapper;
}
// Function to display book content
function showBookDetails(book) {
    if (Modal && ModalContent) {
        const modalBackgroundColor = book.color || '#fff';
        ModalContent.innerHTML = `
            <div class="book-details">
                <div class="book" style="background-color: ${modalBackgroundColor}">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                </div>
            </div>

            <div class="details-header">
                <div class="details-2">
                    <h1>${book.title}</h1>
                    <p>${book.author}</p>
                </div>

                <div class="details-1">
                    <p>${book.plot || 'Not found'}</p>
                </div>

                <div class="details-container">
                    <p>Audience: ${book.audience || 'Not found'}</p>
                    <p>Pages: ${book.pages || 'Not found'}</p>
                    <p>Year: ${book.year || 'Not found'}</p>
                    <p>Publisher: ${book.publisher || 'Not found'}</p>
                </div>
            </div>
        `;
        Modal.style.display = "flex";
        if (ModalClose) {
            ModalClose.addEventListener("click", () => {
                Modal.style.display = "none";
            });
        }
        window.addEventListener("click", (event) => {
            if (event.target === Modal) {
                Modal.style.display = "none";
            }
        });
    }
}
// Event listener to call the function
if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
        showBooks(searchInput.value);
    });
}
fetchDataBooks();
