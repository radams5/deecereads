import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser, updateBook, updateGroup} from './../../ducks/reducer'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './UserHomePage.css'



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
  }

  checkUser = async () => {
    const {id} = this.props
    if (!id){
      try{
        let res = await axios.get('/user')
        this.props.updateUser(res.data)
        this.getUserInfo()
      } catch (err){
        
      } 
    } else {
      this.getUserInfo()
    }
  }

  getUserInfo() {
      this.currentlyReading()
      // this.myGroups()
      this.library()
      this.wishList()
  }


  //////////Adds/////////////////



  currentlyReading = async () => {
    
    let res = await axios.get('/current')
    this.setState({
      current: res.data
    })
  }


  library = async () => {     
    let res = await axios.get('/library')
    this.setState({
      library: res.data
    })
  }
  wishList = async () => { 
    let res = await axios.get('/wishList')
    this.setState({
      wishList: res.data
    })
  }

///////Deletes//////////////


 
  deleteBookCurrent = async (book) => {
    try{
      await axios.delete(`/deleteBookCurrent/${book.id}`)
      this.getUserInfo()
    }catch(err){
      console.log(err)
    }
    alert('book deleted')
  } 
  deleteBookLibrary = async (book) => {

    try{
       await axios.delete(`/deleteBookLibrary/${book.id}`)
      this.getUserInfo()
    }catch(err)
    {
      console.log(err)
    }
    alert('book deleted')
  }
  deleteBookWishList = async (book) => {
    try{
      await axios.delete(`/deleteBookWishList/${book.id}`)
      this.getUserInfo()
  
    }catch(err)
    {
      console.log(err)
    }
    alert('book deleted')
  }
 
  
  render(){
  
    let currentlyReading = this.state.current.map((book) => {
      return(
        <div className='singleBook'>

            <Link to='/BookPage'>
              <button onClick={()=>this.props.updateBook(book)} className="BookButton">
              <img src={book.img} alt={book.title} className='BookImage'/>
              </button>          
            </Link>
          
          <button onClick={() => this.deleteBookCurrent(book)}>Remove book</button>
        </div>
      )
    })
    let library = this.state.library.map((book) => {
      
      return(
        <div className='singleBook'>
          <Link to='/BookPage' >
           <button onClick={()=>this.props.updateBook(book)} className="BookButton">
             <img src={book.img} alt={book.title} className='BookImage'/>
            </button>  
          </Link>
          <button onClick={() => this.deleteBookLibrary(book)}>Remove book</button>
        </div>
      )
    })
    let wishList = this.state.wishList.map((book) => {
      return(
        <div className='singleBook'>
          <Link to='/BookPage'>
            <button onClick={()=>this.props.updateBook(book)} className="BookButton">
             <img src={book.img} alt={book.title} className='BookImage'/>
            </button>  
          </Link>
          <button onClick={() => this.deleteBookWishList(book)}>Remove book</button>
        </div>
      )
    })
    // let myGroups = this.state.myGroups.map((group) => {
    //   return(
    //     <div>
    //       <div>{group.name}</div>
    //       <Link to='/groups'>
    //         <button onClick={()=>this.props.updateGroup(group)}>
    //           <img src={group.img} alt={group.name}/>
    //         </button>  
    //       </Link>
    //       <button onClick={() => this.deleteGroup(group)}>Remove Group</button>
    //     </div>
    //   )
    // })
    return(
      <div>
        <div className='UserPageCombinedContainers'>
          <div className='UserPageGroupContainter'>
          <Link to='WishList'><h2>Wish List</h2></Link>
          <div className='SingleBookContainer'>{wishList}</div>
        </div> 
        <div className='UserPageGroupContainter'>
          <Link to='/CurrentlyReading'><h2>Currently Reading</h2></Link>
          <div className='SingleBookContainer'>{currentlyReading}</div>
        </div>
        {/* <div>
          <h2>My Groups</h2>
          <div>{myGroups}</div>
        </div> */}
        <div className='UserPageGroupContainter'>
          <Link to='Library'><h2>Library</h2></Link>
          <div className='SingleBookContainer'>{library}</div>
        </div>
            
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
const mapDispatchToProps = {
  updateUser,
  updateBook,
  updateGroup
}

export default connect (mapStateToProps, mapDispatchToProps)(UserHomePage)