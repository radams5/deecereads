import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



export default class NavBar extends Component{
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
  return(
    <div>
      <Link to='/'>
        <button>Home</button>
      </Link>
      {/* <Link to='/BookPage'>
        <button>BookPage</button>
      </Link> */}
      {/* <Link to='/Groups'>
        <button>Group</button>
      </Link> */}
      <Link to='/UserHomePage'>
        <button>Profile</button>
      </Link>
      {/* <Link to='/UploadPage'>
        <button>Upload A Book</button>
      </Link> */}
      <Link to='/BookSearch'>
        <button>Find Book</button>
      </Link>
      <Link to='/Login'>
        <button>Sign In</button>
      </Link>
   
     <SearchBar setSearchResults={this.setSearchResults}/> 
   </div>
  )
}
}