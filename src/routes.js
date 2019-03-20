import React from 'react'
import {Route, Switch} from 'react-router-dom'
import BookPage from './components/BookPage/BookPage'
import Landing from './components/Landing/Landing'
// import UploadPage from './components/UploadPage/UploadPage'
import UserHomePage from './components/UserHomePage/UserHomePage'
import Login from './components/Login/Login'
import UsersCurrentlyReadingPage from './components/UserHomePage/UsersCollection/UsersCurrentlyReadingPage'
import UsersLibrary from './components/UserHomePage/UsersCollection/UsersLibrary'
import UsersWishList from './components/UserHomePage/UsersCollection/UsersWishList'
import BookSearch from './components/BookSearch/BookSearch'



export default (
  <Switch>
    <Route  path='/Home' component={Landing}/>
    <Route  exact path='/' component={Login}/>
    <Route  path='/BookPage' component={BookPage}/>
    <Route  path='/UserHomePage' component={UserHomePage}/>
    <Route  path='/BookSearch' component={BookSearch}/>
    <Route  path='/CurrentlyReading' component={UsersCurrentlyReadingPage}/>
    <Route  path='/Library' component={UsersLibrary}/>
    <Route  path='/WishList' component={UsersWishList}/>
  </Switch>
)