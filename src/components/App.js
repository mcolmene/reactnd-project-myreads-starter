import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import BookShelf from './book-shelf/BookShelf';
import Search from './search/Search';
import deepCopy from '../utils/helpers';
import '../static/App.css'

class BooksApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    componentDidMount = () => {
        BooksAPI.getAll()
            .then(books => this.setState({ books }))
            .catch(err => console.log(err))
    };
    updateShelf = book => (
        BooksAPI.getAll()
            .then(books => this.setState({ books }))
            .catch(err => console.log(err))
    );

    onChange = (value, book) => {
        BooksAPI.update(book, value)
            .then(() => {
                const newState = deepCopy(this.state);
                const index = this.state.books.findIndex((obj) => obj.id === book.id);
                newState.books[index].shelf = value;
                this.setState(newState)
            })
            .catch(err => console.log(err))
    };
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path={'/search'} render={
              () => <Search updateShelf={this.updateShelf} {...this.state} />} />
          <Route path={'/'} render={() => <BookShelf onChange={this.onChange} {...this.state} />} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
