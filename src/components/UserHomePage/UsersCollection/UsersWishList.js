import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {updateUser, updateBook} from '../../../ducks/reducer'
import UserPersonalNav from '../../NavBar/UserPersonalNav';

class UsersWishList extends Component{
  constructor(){
    super()
    this.state ={
      wishList:[]
    }
  }
  componentDidMount(){
    this.getCurrentlyReading()
  }

  getCurrentlyReading = async () => {
    let res = await axios.get('/wishList')
    this.setState({
      wishList: res.data
    })
  }
  deleteBookWishList = async (book) => {
    try{
      await axios.delete(`/deleteBookWishList/${book.id}`)
      this.getUserInfo()
  
    }catch(err)
    {
      console.log(err)
    }
    this.getCurrentlyReading()
    alert('book deleted')
  }

render(){
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
  return(
    <div>
      <UserPersonalNav/>
      <div className="UserPersonalPagesTitles">Wish List</div>
      <div className="UserPagebookshelfContainer">
          <div className='' >             
            <div className="UsersPersonalLibraryContainer">{wishList}</div>
          </div>
        </div> 
    </div>
  )
}


}
const mapStateToProps = (reduxState) => {
  return{
    id: reduxState.id
  }
}
const mapDispatchToProps = {
  updateUser,
  updateBook
}
export default connect (mapStateToProps, mapDispatchToProps)(UsersWishList)