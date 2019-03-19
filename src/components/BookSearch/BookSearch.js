import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'


export default class BookSearch extends Component{
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
  let results = this.state.searchResults.map(( book ) => {
    let {title, authors, description} = book.volumeInfo
    let {thumbnail} = book.volumeInfo.imageLinks
    let img = thumbnail
    console.log(img)
    // let {isbn} = book.volumeInfo.industryIdentifiers[0].indentifier
    return(
      <div>
        <h3>{title}</h3>
        <h5>{authors}</h5>
        <img src={img}/>
        {/* <p>{description}</p> */}
      </div>
    )
  })
  
  return(
    <div>
      <h1>
        BookSearch
      </h1>
      <SearchBar setSearchResults={this.setSearchResults}/>
      {results}
      </div>
  )
}







} 