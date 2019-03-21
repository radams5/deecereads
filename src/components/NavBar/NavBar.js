import React, {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import {connect} from 'react-redux'

 class NavBar extends Component{
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
  console.log(22222, this.session)
  return(
    <div className="NavBarMainDiv">
      <div className='NavBarLeftDiv'>
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
    
      <SearchBar setSearchState={this.setSearchState} location={this.props.location} history={this.props.history} />
      </div>
      <div className="NavBarRightDiv">
        <p>welcome {this.props.username}</p>
      </div>
       
     
   </div>
  )
}
}

const mapStateToProps = (reduxState) => {
  return{
   username: reduxState.username
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))