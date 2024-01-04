
// Define constants for element IDs and classes


const searchButton = document.getElementById("search-btn") as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const booksContainer = document.getElementById("booksContainer") as HTMLInputElement;
const Modal = document.getElementById("Modal") as HTMLInputElement; 
const ModalContent = document.getElementById("Modal-content-inner")as HTMLInputElement;
const ModalClose = document.getElementById("Modal-close")as HTMLInputElement; 



// Define the Book interface
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

// Initialize the books array with type annotation
const books: Book[] = [];

// Function to initialize the books array by fetching data from a JSON API
async function fetchDataBooks() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        books.length = 0; 
        books.push(...(await response.json() as Book[]));
        await showBooks("");
        console.log(fetchDataBooks);
        
    } catch (error) {
        console.error("Error fetching books: ", error);
    }
}

// Function to display books based on a search query
async function showBooks(searchQuery: string) {

    if (!booksContainer) return;

    booksContainer.innerHTML = '';

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

    for (const book of filteredBooks) {
        const bookCard = createBookContent(book);
        booksContainer.appendChild(bookCard);
    }
}

// Function to create a book card element
function createBookContent(book: Book): HTMLElement {
    const bookWrapp = document.createElement("div");
    bookWrapp.classList.add("book");

    if (book.color) {
        bookWrapp.style.backgroundColor = book.color;
    }

    bookWrapp.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
    `;
    bookWrapp.addEventListener("click", () => showBookDetails(book));

    return bookWrapp;
}

// Function to display book content
function showBookDetails(book: Book) {


    if (Modal && ModalContent) {
      ModalContent.innerHTML = `
            <div class="book-">
                <div class="book" style="background-color: ${book.color || '#fff'}">
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
                    <p>Pages:${book.pages || 'Not found'}</p>
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
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn") as HTMLButtonElement | null;
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      showBooks(searchInput.value);
    });
  }

  fetchDataBooks();
});
