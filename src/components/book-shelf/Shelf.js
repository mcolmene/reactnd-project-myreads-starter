import React from 'react';
import Book from '../common/Book';

const Shelf = ({ shelfName, booksOnShelf, onChange }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                { booksOnShelf.length > 0
                    ? booksOnShelf.map(book => <Book key={book.id} onChange={onChange} {...book} />)
                    : <p style={{ textAlign: 'center' }}>No Books to Display</p>
                }
            </ol>
        </div>
    </div>
);

export default Shelf;