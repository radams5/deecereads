import React, {Component} from 'react'
import {connect} from 'react-redux'

class SearchBar extends Component{
constructor(){
  super()
  this.state = {
    searchBar: ''
  }
}


  handleUpdateState(val, prop){
    this.setState({
      [prop]: val
    })
    console.log(this.state)
  }

  render(){

    return(
      <div>
        <input placeholder='book title' 
          onChange={e => this.handleUpdateState(e.target.value, 'searchBar')}
        />
        <button>search</button>
      </div>
    )
  }
}
export default SearchBar
