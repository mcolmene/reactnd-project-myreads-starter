import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from '../../api/BooksAPI'
import Book from "../common/Book";
import deepCopy from '../../utils/helpers';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    onChange = (value, book) => {
        BooksAPI.update(book, value)
            .then((status) => {
                this.props.updateShelf();
                const newState = deepCopy(this.state);
                const index = this.state.books.findIndex((obj) => obj.id === book.id);
                newState.books[index].shelf = value;
                this.setState(newState)
            })
            .catch(err => console.log(err))
    };
    onInputChange = (event) => {
        const value = event.target.value;
        if (value !== '') {
            BooksAPI.search(event.target.value)
                .then(books => {
                    let searchedBooks = books;
                    if(!books.error) {
                        this.props.books.forEach(book => {
                           const index = searchedBooks.findIndex(sb => sb.id === book.id);
                           if(index > -1) {
                               searchedBooks[index].shelf = book.shelf;
                           }
                        })
                    }
                    return (books.error) ? this.setState({ books: [] }) : this.setState({ books: searchedBooks })
                })
                .catch(err => console.log(err))
        }
        if (value === '') {
            this.setState({ books: [] });
        }
    };
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={'/'}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={500}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.onInputChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    { (this.state.books.length > 0)
                        ? (
                            <ol className="books-grid">
                                {this.state.books.map((book) => (
                                    <Book
                                        key={book.id}
                                        onChange={this.onChange}
                                        {...book}/>
                                ))}
                            </ol>
                        )
                        : (<h1 style={{ textAlign: 'center' }}>No results</h1>)
                    }
                </div>
            </div>
        )}
};