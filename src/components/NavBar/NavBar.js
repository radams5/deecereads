import React, {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import {connect} from 'react-redux'
import {Menu, Icon, Avatar 
} from 'antd'
import './navBar.css'
 class NavBar extends Component{
  constructor(){
    super()
    this.state = {
      SearchBar: '',
      searchResults: [],
      searchBar2: false
    }
    this.setSearchState = this.setSearchState.bind(this)
  }

  
  setSearchState = (info, partOfState) => {
    this.setState({
      [partOfState]: info
    })
  }

  handleNavigation = (nav) => {
    this.props.history.push(`${nav}`)
  }
  toggleSearch = () => {
    if(this.state.searchBar2 === false)this.setState({
      searchBar2: true
    }) 
     else {
      this.setState({
        searchBar2: false
      })
  }
  console.log(this.state)
}

render(){
  const SearchBar2 = <SearchBar style={{width: '750px'}}  setSearchState={this.setSearchState} location={this.props.location} history={this.props.history} toggleSearch={this.toggleSearch}/>


  return(
    <div className="NavBarMainDiv">
      <div style = {{width: "100vw", display: "flex", justifyContent: "space-around", alignItems: "center"}} >

        <h1 className='WebsiteName' style = {{margin: "8px 0px"}} onClick={(e) => this.handleNavigation("/Home")}>deeceReads</h1>
        <h1 className='WebsiteInitials' onClick={(e) => this.handleNavigation("/Home")}>dR</h1>
        <div style = {{width: "33%"}}> 
          <Menu style = {{backgroundColor: "rgb(244, 234, 213)"}}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail" onClick={(e) => this.handleNavigation("/UserHomePage")}>

              <Icon type="user" />Profile
            </Menu.Item >
            <Menu.Item key="app" onClick={(e) => this.handleNavigation("Library")}>
              <Icon type="appstore" />Library
            </Menu.Item>
          
            <Menu.Item key="search" onClick={(e) => this.handleNavigation("/BookSearch")}>
            <Icon type="search" />
      Search
            </Menu.Item>
            <Menu.Item key="login" onClick={(e) => this.handleNavigation("/")}>
            <Icon type="form" />
      Login
            </Menu.Item>
          </Menu>
          </div>
          
        <div className="SearchBar" >
          <SearchBar  setSearchState={this.setSearchState} location={this.props.location} history={this.props.history} />
          </div>
       {/*  <div className="SearchBar2"  style={{display: this.state.searchBar2 ? '': "none"}}>
            {SearchBar2}
          </div> */}
          <div className='SmallSearchIcon'>
              <Icon type="search"  onClick={(e) => this.handleNavigation('/BookSearch')}/>
          </div>
          {this.props.username && <div >
        
          <Avatar onClick={() => this.props.history.push('/UserHomePage')}>
            {this.props.username.charAt(0).toUpperCase()}
            </Avatar>
        
          </div>
          
        }      
        {!this.props.username && <div className="NavBarRightDiv">
        
        <Avatar  icon = "user"></Avatar>
      
        </div>
    }      
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