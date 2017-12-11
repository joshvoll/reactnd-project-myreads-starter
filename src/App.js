import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []

  }

  // update the shelf of the code
  updateShelf = (updateBook, shelf) => {
    
    BooksAPI.update({id: updateBook.id}, shelf).then(response => {
      const newBook = Object.assign({}, updateBook, { shelf : shelf});
      this.setState({
        books: [
          ...this.state.books.filter(book => book.id !== updateBook.id),
          newBook
        ]
      })
    }).catch(err => console.error(`Error ocurred updating bookg: ${err}`))
    
  };

  componentDidMount = () => {
    // loading the bookg api test 
    BooksAPI.getAll().then((books) => {
      // set the state with the new data
      this.setState({ books: books})
    }).catch(err => console.error(`Error ocurred fetching books: ${err}`));
    
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage 
            books={this.state.books} 
            handleShelfUpdate={this.updateShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage 
            books={this.state.books}
            handleShelfUpdate={this.handleShelfUpdate}
          />
        )}
        />
      </div>

    )
  }
}

export default BooksApp
