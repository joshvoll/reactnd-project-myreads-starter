import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  // methods call the getAll() method from books api
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      this.setBookRatings();
    });
  }


  setBookRatings = () => {
    this.setState(({ books }) => {
      return {
        books: books.map(book => {
          const storedRating = localStorage.getItem(`${book.id}`);
          book.rating = storedRating ? storedRating : 0;
          return book;
        })
      };
    });
  };

  // filtering the book to call the book id and returning the match
  isNewBook = book => {
    const matchedBooks = this.state.books.filter(
      myBook => myBook.id === book.id
    );
    return matchedBooks.length === 0;
  };

  // parameters: book, shelf, return new state adding the new book 
  addBook = (book, shelf) => {
    this.setState(prevState => {
      book.shelf = shelf;
      prevState.books.push(book);
      return {
        books: prevState.books
      };
    });
  };


  updateBook = (book, shelf) => {
    this.setState(prevState => {
      if (shelf === 'none') {
        return {
          books: prevState.books.filter(
            currentBook => currentBook.id !== book.id
          )
        };
      }
      return {
        books: prevState.books.map(currentBook => {
          if (currentBook.id === book.id) {
            currentBook.shelf = shelf;
          }
          return currentBook;
        })
      };
    });
  };

  // parameters: book, shelf, update the bookAPi 
  handleShelfChange = (book, shelf) => {
    if (this.isNewBook(book)) {
      this.addBook(book, shelf);
    } else {
      this.updateBook(book, shelf);
    }

    BooksAPI.update(book, shelf);
  };

  // parameters: book and rating, updating the ratings
  updateBookRating = (book, rating) => {
    this.setState(({ books }) => {
      return {
        books: books.map(currentBook => {
          if (currentBook.id === book.id) {
            currentBook.rating = rating;
          }
          return currentBook;
        })
      };
    });

  };
  
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              books={this.state.books}
              updateBook={this.handleShelfChange}
              updateBookRating={this.updateBookRating}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              books={this.state.books}
              updateBook={this.handleShelfChange}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;