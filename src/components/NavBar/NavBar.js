import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



export default class NavBar extends Component{
constructor(){
  super()
  this.state = {

  }
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
      <Link to='/Login'>
        <button>Sign In</button>
      </Link>
   
     <SearchBar/> 
   </div>
  )
}
}