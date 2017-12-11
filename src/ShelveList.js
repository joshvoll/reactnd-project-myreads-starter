import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';


// default properties
const SHELVES = [
    {
        id: 'currentlyReading',
        name: 'Currently Reading'
    },
    {
        id: 'wantToRead',
        name: 'Want to Read'
    },
    {
        id: 'read',
        name: 'Read'
    }
]

class ShelveList extends React.Component {
    // defining props para 
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleShelfUpdate: PropTypes.func.isRequired
    }

    render() {
        const { books, handleShelfUpdate } = this.props;
        console.log('libros', books)
        return(
            <div>
                {SHELVES.map(shelf => (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">
                            {shelf.id.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })}
                        </h2>
                    
                        <ListBooks  
                            key={shelf}
                            books={books.filter(book => book.shelf === shelf.id)}
                            handleShelfUpdate={handleShelfUpdate}
                        />
                    </div>
                   
                ))}
            </div>
        )
    }
}

export default ShelveList;