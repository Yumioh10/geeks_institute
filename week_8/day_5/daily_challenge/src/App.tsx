import React, { useState } from 'react';
import './index.css';

// 1. Define the Book type
interface Book {
  id: number;
  title: string;
  author: string;
}

// 2. Generic List Component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// 3. Main BookApp Component
export default function BookApp() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // 4. Add a new book function
  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      const newBook: Book = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: newTitle,
        author: newAuthor
      };
      setBooks([...books, newBook]);
      setNewTitle('');
      setNewAuthor('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addBook();
    }
  };

  // 5. Render function for each book
  const renderBook = (book: Book) => (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <span className="book-id">ID: {book.id}</span>
    </div>
  );

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="main-title">📚 Book List</h1>
        <p className="subtitle">A TypeScript & React app with generic components</p>

        {/* Add Book Form */}
        <div className="add-book-form">
          <h2 className="form-title">Add New Book</h2>
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Book Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
            />
            <button
              onClick={addBook}
              className="add-button"
            >
              Add Book
            </button>
          </div>
        </div>

        {/* Book List Display */}
        <div>
          <h2 className="collection-title">
            My Collection ({books.length} {books.length === 1 ? 'book' : 'books'})
          </h2>
          {books.length === 0 ? (
            <p className="empty-message">No books yet. Add your first book above!</p>
          ) : (
            <List items={books} renderItem={renderBook} />
          )}
        </div>
      </div>
    </div>
  );
}