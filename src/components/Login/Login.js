import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'
import './Login.css'

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
      this.props.history.push('/Home')
    } catch(err) {
      alert('registration error, try a different username or password')
    }
  }

  login = async () => {
    let user = {
      username: this.state.username,
      password: this.state.password
      }
      try {
        let res = await axios.post('login', user)
        await this.props.updateUser(res.data)
        
        this.props.history.push('/Home')
      } catch(err) {
        alert('incorrect username or password')
      } 
  }
  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  render(){

  return(
    <div className="LoginMainDiv">
      <div className="LoginMainDivOpacitySheet">
        <form className='LoginBox'>
          <h1>Please Login</h1>
          <p>Hint user: asdf pass: asdf</p>
            <div className='InputDiv'>
              <input placeholder='username' onChange={e =>    this.handleChange('username', e.target.value)}/>
              <input type="password" required placeholder='password' onChange={e => this.handleChange('password', e.target.value)}/>
            </div>
            <div>
              <button onClick={this.login}>Login</button>
              <button onClick={this.register}>Register</button>
          </div>
          <h3 className='SmallScreenPrompt'>Check me out in Mobile View!</h3>
        </form>
      </div>
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