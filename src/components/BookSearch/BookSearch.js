import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import SearchBar from '../SearchBar/SearchBar'
import {addBook} from '../../ducks/reducer'


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
    console.log(11111111, this.state)
  }



render(){
  console.log(34343434, this.props)
    if (this.props.googleBooks){let results = this.props.googleBooks.map(( book ) => {
      console.log(book.volumeInfo)
      let {title, authors, description} = book.volumeInfo
      let {thumbnail} = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks : ''
      let isbn = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : null
      let bookToAdd = {
        title: title, 
        book_image: thumbnail, 
        primary_isbn10: isbn, 
        description: description
      }
        console.log(44444444, thumbnail)
        let img = thumbnail
        

        return(
          <div className="SearchResultBookshelf">
            <div>
              <h3>{title}</h3>
              <h5>{authors}</h5>
              <Link to='/bookPage'><button className='BookButton' onClick={() => this.props.addBook(bookToAdd)}>{img ? <img alt={title} src={img}/> : null}</button></Link>
            </div>
          </div>
        )
      })
      
      return(
        <div className='BookSearchPage'>
          <div className='TopOfBookshelf'>
            <h1> BookSearch </h1>
            <SearchBar setSearchState={this.setSearchResults} location={this.props.location} history={this.props.history}/>
          </div>
            {results}
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
  addBook
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(BookSearch)