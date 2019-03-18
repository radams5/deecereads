import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {updateUser, updateBook} from '../../../ducks/reducer'
import UserPersonalNav from '../../NavBar/UserPersonalNav'

class UsersCurrentlyReadingPage extends Component{
  constructor(){
    super()
    this.state ={
      current: []
    }
  }
  componentDidMount(){
    this.getCurrentlyReading()
  }

  getCurrentlyReading = async () => {
    let res = await axios.get('/current')
    this.setState({
      current: res.data
    })
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
  return(
    <div>
      <UserPersonalNav/>
      <div className="UserPersonalPagesTitles">Currently Reading</div>    
        <div className="UserPagebookshelfContainer">
            <div className='' >             
              <div className="UsersPersonalLibraryContainer">{currentlyReading}</div>
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

export default connect (mapStateToProps, mapDispatchToProps) (UsersCurrentlyReadingPage)