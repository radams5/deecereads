import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon} from 'antd'
import './navBar.css'
const SubMenu = Menu.SubMenu
class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      SearchBar: '',
      searchResults: [],
      searchBar2: false,
      collapsed: false,      
    }
    this.setSearchState = this.setSearchState.bind(this)
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  setSearchState = (info, partOfState) => {
    this.setState({
      [partOfState]: info
    })
  }

  handleNavigation = (nav) => {
    this.props.history.push(`${nav}`)
  }
 

  render() {

    return (
      <div className="NavBarMainDiv">
        <div style={{ width: "100vw", display: "flex", justifyContent: "space-around", alignItems: "center" }} >
          <div className='Menu'>
            <Menu 
              style={{ backgroundColor: "rgb(244, 234, 213)" }}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <SubMenu key="mainMenu" title={<span><Icon type="menu-unfold" /><span>Menu</span></span>}>
                <Menu.Item key="profile" onClick={(e) => this.handleNavigation("/UserHomePage")}>
                  <Icon type="user" />
                  Profile
                </Menu.Item >
                <Menu.Item key="search" onClick={(e) => this.handleNavigation("/BookSearch")}>
                    <Icon type="search" />
                    Search
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Collections</span></span>}>
                  <Menu.Item key="app" onClick={(e) => this.handleNavigation("WishList")}>
                    <Icon type="appstore" />
                    Wish List
                  </Menu.Item>
                  <Menu.Item key="app" onClick={(e) => this.handleNavigation("CurrentlyReading")}>
                    <Icon type="appstore" />
                    Currently Reading
                   </Menu.Item>
                  <Menu.Item key="app" onClick={(e) => this.handleNavigation("Library")}>
                    <Icon type="appstore" />
                    Library
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="login" onClick={(e) => this.handleNavigation("/")}>
                  <Icon type="form" />
                  Login
            </Menu.Item>
              </SubMenu>

            </Menu>
          </div>
          <h1 className='WebsiteName' style={{ margin: "8px 0px" }} onClick={(e) => this.handleNavigation("/Home")}>deeceReads</h1>
          <h1 className='WebsiteInitials' onClick={(e) => this.handleNavigation("/Home")}>dR</h1>
          {/* <div className="SearchBar" >
          <SearchBar  setSearchState={this.setSearchState} location={this.props.location} history={this.props.history} />
          </div> */}
          <div className='SmallSearchIcon'>
            <Icon type="search" onClick={(e) => this.handleNavigation('/BookSearch')} />
          </div>
          {this.props.username ? <div onClick={() => this.props.history.push('/UserHomePage')} className='Initials'>
            {this.props.username.charAt(0).toUpperCase()}
          </div> : <div> </div>}


        </div>


      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    username: reduxState.username
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))