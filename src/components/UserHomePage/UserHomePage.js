import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser, updateBook} from './../../ducks/reducer'
import axios from 'axios'
import {Link} from 'react-router-dom'



 class UserHomePage extends Component{
  constructor(){
    super()
    this.state = {
      id: '',
      username: '',
      current: [],
      myGroups: [],
      library: [],
      wishList: []
    }

  }
    componentDidMount(){
  this.checkUser()
  this.currentlyReading()
  this.myGroups()
  this.library()
  this.wishList()
}
checkUser = async () => {
  const {id} = this.props
if (!id){
  try{
      let res = await axios.get('/users')
      this.props.updateUser(res.data)
      this.props.history.push(`/UserHomePage`)
    } catch (err){

    } 
  } 
  }
  currentlyReading = async () => {
  let id = {
      id: this.props.id
    } 
    let res = await axios.post('/current', id)
    this.setState({
      current: res.data
    })
  }
  myGroups = async () => {
  let id = {
      id: this.props.id
    } 
    let res = await axios.post('/myGroups', id)
    this.setState({
      myGroups: res.data
    })
  }
  library = async () => {
  let id = {
      id: this.props.id
    } 
    let res = await axios.post('/library', id)
    this.setState({
      library: res.data
    })
  }
  wishList = async () => {
  let id = {
      id: this.props.id
    } 
    let res = await axios.post('/wishList', id)
    this.setState({
      wishList: res.data
    })
  }
  
  render(){
    console.log(444444, this.state.current)
    let currentlyReading = this.state.current.map((book) => {
      return(
        <div>
          <div>{book.title}</div>
          <Link to='/BookPage'>
            <button onClick={this.props.updateBook(book)}>
             <img src={book.img} alt={book.title}/>
            </button>          
          </Link>
        </div>
      )
    })
    let myGroups = this.state.myGroups.map((group) => {
      return(
        <div>
          <div>{group.name}</div>
          <Link to='/groups'><img src={group.img} alt={group.name}/></Link>
        </div>
      )
    })
    let library = this.state.library.map((book) => {
      return(
        <div>
          <div>{book.title}</div>
          <Link to='/groups' ><img src={book.img} alt={book.title}/></Link>
        </div>
      )
    })
    let wishList = this.state.wishList.map((book) => {
      return(
        <div>
          <div>{book.title}</div>
          <Link to='/groups'><img src={book.img} alt={book.title}/></Link>
        </div>
      )
    })
    return(
      <div>
        <div>
          <h1>Currently Reading</h1>
          <div>{currentlyReading}</div>
        </div>
        <div>
          <h1>My Groups</h1>
          <div>{myGroups}</div>
        </div>
        <div>
          <h1>Library</h1>
          <div>{library}</div>
        </div>
        <div>
          <h1>Wish List</h1>
          <div>{wishList}</div>
        </div>       
     </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    username: reduxState.username,
    id: reduxState.id
  }
}
const mapDispatchToProps ={
  updateUser,
  updateBook
}

export default connect (mapStateToProps, mapDispatchToProps)(UserHomePage)