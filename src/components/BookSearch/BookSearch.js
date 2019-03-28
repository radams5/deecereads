import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addBook, updateBook} from '../../ducks/reducer'
import SearchBar from '../SearchBar/SearchBar'


class BookSearch extends Component{
  constructor(){
    super()
    this.state = {
      searchResults: []
    }
    this.setSearchResults = this.setSearchResults.bind(this)
  }

  setSearchResults(searchResults){
    this.setState({searchResults})
  }



render(){
    if (this.props.googleBooks){let results = this.props.googleBooks.map(( book ) => {
      let {title, authors, description} = book.volumeInfo
      let {thumbnail} = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks : ''
      let isbn = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : null
      let bookToAdd = {
        title: title, 
        book_image: thumbnail, 
        primary_isbn10: isbn, 
        description: description
      }
        let img = thumbnail
        

      return(
          <div>
            <div className='ReturnedSearchInfoDiv'>
              <h4>{title}</h4>
              <h5>{authors}</h5>
              <Link to='/bookPage'><button className='BookButton' onClick={() => this.props.addBook(bookToAdd)}>{img ? <img alt={title} src={img}/> : null}</button></Link>
            </div>
          </div>
        )
      })
      
      return(
        <div className='BookSearchPage'>        
          <div className='SearchBarDiv'>
            < SearchBar  setSearchState={this.setSearchState}   
              location={this.props.location} 
              history= {this.props.history} 
              className='SearchBar'
            />
          </div>        
          <div  className="SearchResultBookshelf">
            {results}
          </div>
        </div>
      )}else{
        return(
          <div>
            <h1>No Results</h1>
          </div>
        )
      }
  }
}



const mapStateToProps = (reduxState) => {
  return{
   googleBooks: reduxState.googleBooks
  }
} 
const mapDispatchToProps = {
  addBook,
  updateBook
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(BookSearch)