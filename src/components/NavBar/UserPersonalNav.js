import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserPersonalNav extends Component{
  constructor(){
    super()
    this.state = {
  
    }
  }



  render(){
    return(
      <div>
        <div className="UserPersonalNav">
          <Link to='/CurrentlyReading'><h6>Current</h6></Link>
          <Link to='/Library'><h6>Library</h6></Link>
          <Link to='/WishList'><h6>Wish List</h6></Link>
        </div>
      
    </div>
    )
  }

}