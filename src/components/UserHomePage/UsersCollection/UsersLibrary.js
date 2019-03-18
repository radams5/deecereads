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



render(){
  let library = this.state.library.map((book) => {
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