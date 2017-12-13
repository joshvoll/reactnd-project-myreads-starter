import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
  render() {
    return (
      <div key={this.props.shelf.id} className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelf.title}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
              <Book
                key={book.id}
                book={book}
                onShelfChange={this.props.updateBook}
                updateRating={this.props.updateBookRating}
                displayRating={true}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;