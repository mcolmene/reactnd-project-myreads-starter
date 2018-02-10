import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

export default class BookShelf extends Component {
    render() {
        const { books } = this.props;
        const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const read = books.filter(book => book.shelf === 'read');
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf
                        shelfName={'Currently Reading'}
                        booksOnShelf={currentlyReading}
                        {...this.props}
                    />
                    <Shelf
                        shelfName={'Want to Read'}
                        booksOnShelf={wantToRead}
                        {...this.props}
                    />
                    <Shelf
                        shelfName={'Read'}
                        booksOnShelf={read}
                        {...this.props}
                    />
                </div>
                <div className="open-search">
                    <Link to={'/search'}>Add a book</Link>
                </div>
            </div>
        )
    }
}