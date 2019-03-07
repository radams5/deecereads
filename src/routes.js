import React from 'react'
import {Route, Switch} from 'react-router-dom'
import BookPage from './components/BookPage/BookPage'
import Groups from './components/Groups/Groups'
import Landing from './components/Landing/Landing'
import UploadPage from './components/UploadPage/UploadPage'
import UserHomePage from './components/UserHomePage/UserHomePage'
import Login from './components/Login/Login'


export default (
  <Switch>
    <Route  exact path='/' component={Landing}/>
    <Route  path='/BookPage' component={BookPage}/>
    <Route  path='/Groups' component={Groups}/>
    <Route  path='/UploadPage' component={UploadPage}/>
    <Route  path='/UserHomePage' component={UserHomePage}/>
    <Route  path='/Login' component={Login}/>
  </Switch>
)