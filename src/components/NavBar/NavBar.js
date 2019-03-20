import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'




export default class NavBar extends Component{
  constructor(){
    super()
    this.state = {
      SearchBar: '',
      searchResults: []
    }
    this.setSearchState = this.setSearchState.bind(this)
  }

  
  setSearchState(info, partOfState){
    this.setState({
      [partOfState]: info
    })
    console.log(11111111, this.state)
  }



render(){
  return(
    <div>
      <Link to='/Home'>
        <button>Home</button>
      </Link>
      <Link to='/UserHomePage'>
        <button>Profile</button>
      </Link>
    
      <Link to='/BookSearch'>
        <button>Find Books</button>
      </Link>
      <Link to='/'>
        <button>Sign In</button>
      </Link>
   
     <SearchBar setSearchState={this.setSearchState} history={this.props.history}/> 
   </div>
  )
}
}