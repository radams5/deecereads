import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'

class Login extends Component{
constructor(){
  super()
  this.state = {
    username: '',
    password: '',
    id: 0
  }
}



  register = async () => {
   
  let user = {
  username: this.state.username,
  password: this.state.password
  }
  try {
    let res = await axios.post('/register', user)
    this.props.updateUser(res.data)
    this.props.history.push('/UserHomePage')
  } catch(err) {

  }
  }

  login = async () => {
    let user = {
      username: this.state.username,
      password: this.state.password
      }
      try {
        let res = await axios.post('login', user)
        this.props.updateUser(res.data)
        this.props.history.push('/UserHomePage')
      } catch(err) {
        
      } 
  }
  handleChange(prop, val){
  this.setState({
    [prop]: val
  })
  }

  render(){
    // console.log(this.props)
  return(
    <div>
      <input placeholder='username' onChange={e => this.handleChange('username', e.target.value)}/>
      <input placeholder='password' onChange={e => this.handleChange('password', e.target.value)}/>
    
      <button onClick={this.login}>Login</button>
      <button onClick={this.register}>Register</button>
    </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
    username: reduxState.username,
    id: reduxState.id
  }
}
const mapDispatchToProps = {
  updateUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Login) 