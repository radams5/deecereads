import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {updateUser, updateBook} from '../../../ducks/reducer'
import UserPersonalNav from '../../NavBar/UserPersonalNav'

class UsersLibrary extends Component{
  constructor(){
    super()
    this.state ={
      library:[]
    }
  }
  componentDidMount(){
    this.getCurrentlyReading()
  }

  getCurrentlyReading = async () => {
    let res = await axios.get('/library')
    this.setState({
      library: res.data
    })
  }
  deleteBookLibrary = async (book) => {

    try{
      await axios.delete(`/deleteBookLibrary/${book.id}`)
      this.getUserInfo()
    }catch(err)
    {
      console.log(err)
    }
    this.getCurrentlyReading()
    alert('book deleted')
  }



render(){
  let library = this.state.library.map((book) => {
    return(
      <div className='singleBook'>

          <Link to='/BookPage'>
            <button onClick={()=>this.props.updateBook(book)} className="BookButton">
            <img src={book.img} alt={book.title} className='BookImage'/>
            </button>          
          </Link>
        
        <button  style={{borderRadius:"4px"}} onClick={() => this.deleteBookLibrary(book)}>Remove book</button>
      </div>
    )
  })
  return(
    <div>
      <UserPersonalNav/>
      <div className="UserPersonalPagesTitles">Library</div>
      <div className="UserPagebookshelfContainer">
          <div className='' >             
            <div className="UsersPersonalLibraryContainer">{library}</div>
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

export default connect (mapStateToProps, mapDispatchToProps) (UsersLibrary)