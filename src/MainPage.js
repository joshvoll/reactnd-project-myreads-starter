import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SheleveList from './ShelveList';


class MainPage extends React.Component {
    // defining props para 
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleShelfUpdate: PropTypes.func.isRequired
    }

    render() {
        const { books,  handleShelfUpdate } = this.props;

        return(
          <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <SheleveList 
                        books={books}
                        handleShelfUpdate={handleShelfUpdate}
                    />
                </div>
                <div className="open-search">
                     <Link to='/search'/>
                </div>
            </div>
        </div>
        )
    }
}

export default MainPage;