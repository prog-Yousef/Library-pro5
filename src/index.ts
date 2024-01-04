


//  interface
interface Book {
    title: string;
    author: string;
    plot?: string;
    audience?: string;
    pages?: number;
    year?: number;
    publisher?: string;
    color?: string;
}

// variables

const booksContainer = document.getElementById("booksContainer") as HTMLInputElement;
const Modal = document.getElementById("Modal") as HTMLInputElement; 
const searchButton = document.getElementById("search-btn") as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const ModalContent = document.getElementById("Modal-content-inner")as HTMLInputElement;
const ModalClose = document.getElementById("Modal-close")as HTMLInputElement; 
const books: Book[] = [];




// fetch data from api
async function fetchDataBooks() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        
        books.push(...(await response.json() as Book[]));
        console.log(fetchDataBooks);
        await showBooks("");

        
    } catch (error) {
        console.error(`Error fetching books: ${error}`);
    }
}


// Function to display books 
async function showBooks(searchResults: string): Promise<void> {
    if (!booksContainer) {
        return;
    }

    booksContainer.innerHTML = '';

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchResults.toLowerCase())
    );

    filteredBooks.forEach((book) => {
        const bookCard = createBookContent(book);
        booksContainer.appendChild(bookCard);
    });
}

// Function to create elements
function createBookContent(book: Book): HTMLElement {
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
function showBookDetails(book: Book): void {
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
                    <p>${book.plot }</p>
                </div>

                <div class="details-container">
                    <p>Audience: ${book.audience }</p>
                    <p>Pages: ${book.pages }</p>
                    <p>Year: ${book.year}</p>
                    <p>Publisher: ${book.publisher }</p>
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
