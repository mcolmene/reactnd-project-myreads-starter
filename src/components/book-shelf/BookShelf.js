import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from "../common/Book";

export default class BookShelf extends Component {
    render() {
        const { books, onChange } = this.props;
        const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const read = books.filter(book => book.shelf === 'read');
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                { currentlyReading.length > 0
                                    ? books
                                    .filter(book => (book.shelf === 'currentlyReading'))
                                    .map(book => <Book key={book.id} onChange={onChange} {...book} />)
                                    : <p style={{ textAlign: 'center' }}>No Books to Display</p>
                                }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { wantToRead.length > 0
                                        ? wantToRead.map(book => (
                                            <Book
                                                key={book.id}
                                                onChange={onChange}
                                                {...book}
                                            />
                                        ))
                                        :  <p style={{ textAlign: 'center' }}>No Books to Display</p>
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { read.length > 0
                                        ? books
                                        .filter(book => (book.shelf === 'read'))
                                        .map(book => (
                                            <Book
                                                key={book.id}
                                                onChange={onChange}
                                                {...book}
                                            />
                                        ))
                                        : <p style={{ textAlign: 'center' }}>No Books to Display</p>
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={'/search'}>Add a book</Link>
                </div>
            </div>
        )
    }
}