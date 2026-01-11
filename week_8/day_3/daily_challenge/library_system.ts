// Define the Book interface with required and optional properties
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

// Base Library class with private property and public methods
class Library {
  private books: Book[] = [];

  // Public method to add a book to the library
  public addBook(book: Book): void {
    this.books.push(book);
    console.log(`Added: "${book.title}" by ${book.author}`);
  }

  // Public method to get book details by ISBN
  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find(book => book.isbn === isbn);
  }

  // Protected method to allow child classes to access books
  protected getAllBooks(): Book[] {
    return this.books;
  }
}

// DigitalLibrary extends Library with additional functionality
class DigitalLibrary extends Library {
  readonly website: string; // Readonly property

  constructor(website: string) {
    super();
    this.website = website;
  }

  // Public method to list all book titles
  public listBooks(): string[] {
    return this.getAllBooks().map(book => book.title);
  }

  // Additional method to display formatted library info
  public displayLibraryInfo(): void {
    console.log(`\n📚 Digital Library`);
    console.log(`🌐 Website: ${this.website}`);
    console.log(`📖 Total Books: ${this.getAllBooks().length}`);
  }
}

// ============================================
// Demo: Create instance and test functionality
// ============================================

console.log("=== Library System Demo ===\n");

// Create a DigitalLibrary instance
const myLibrary = new DigitalLibrary("https://mylibrary.com");

// Add books to the library
myLibrary.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0-7432-7356-5",
  publishedYear: 1925,
  genre: "Classic Fiction"
});

myLibrary.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  isbn: "978-0-06-112008-4",
  publishedYear: 1960,
  genre: "Classic Fiction"
});

myLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0-452-28423-4",
  publishedYear: 1949,
  genre: "Dystopian"
});

myLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0-13-235088-4",
  publishedYear: 2008
  // Note: no genre specified (optional property)
});

// Display library information
myLibrary.displayLibraryInfo();

// Get details of a specific book by ISBN
console.log("\n=== Book Details ===");
const book = myLibrary.getBookDetails("978-0-452-28423-4");
if (book) {
  console.log(`\nTitle: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`ISBN: ${book.isbn}`);
  console.log(`Published: ${book.publishedYear}`);
  console.log(`Genre: ${book.genre || "Not specified"}`);
}

// List all book titles
console.log("\n=== All Book Titles ===");
const titles = myLibrary.listBooks();
titles.forEach((title, index) => {
  console.log(`${index + 1}. ${title}`);
});

// Demonstrate readonly property
console.log(`\n=== Library Website ===`);
console.log(`Website URL: ${myLibrary.website}`);
// myLibrary.website = "new-url"; 