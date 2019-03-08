import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBook} from './../../ducks/reducer'
import axios from 'axios';



class BookPage extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      img: '',
      bookReview: {},
      review: '',
      rating: 0
    }
  }
  componentDidMount(){
  this.pullBookReview()
  }
  pullBookReview = async () => {
    const {id, bookId} = this.props
    let body = { id: id, bookId: bookId }
    let res = await axios.post('/bookReview', body)
    this.setState({
      bookReview: res.data
    })
  }
  updateReview = async () => {
    const {id, bookId} = this.props
    const {review} = this.state
    let body = { id: id, bookId: bookId, review}
    let res = await axios.put('/UpdateBookReview', body)
    this.setState({
      bookReview: res.data,
    })
    }
  updateRating = async () => {
    const {id, bookId} = this.props
    const {rating} = this.state
    let body = { id: id, bookId: bookId, rating}
    let res = await axios.put('/UpdateBookRating', body)
    this.setState({
      bookReview: res.data,
    })
    }

    handleUpdateState(val, prop){
      this.setState({
        [prop]: val
      })
    }
    addToLibrary = async () => {
      const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToLibrary', body)
      console.log('library updated')
    }
    addToWishList = async () => {
      const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToLibrary', body)
    }
    addToCurrentlyReading = async () => {
      const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToLibrary', body)
    }



  render(){
    let review = this.state.bookReview.review
    let rating = this.state.bookReview.rating
    return(
      <div>
        <div>{this.props.title}</div>
        <img src={this.props.img} alt={this.props.title}/>
        <div className="dropdown">
          <button className="dropdwnbutton">Add to</button>
          <div className='dropdownContent'>
            <button onClick={() => this.addToLibrary()}>Library</button>
            <button onClick={() => this.addToWishList()}>Wish List</button>
            <button onClick={() => this.addToCurrentlyReading()}>currently Readin</button>
          </div>
        </div>
        <div>Book Summary</div>
        
        <div>
          <h2>My Review</h2>
          <p>{review}</p>
          <button onClick={()=>this.updateReview()}>Update Review</button>
          <input placeholder='Update Review' value={this.state.review} onChange={e => this.handleUpdateState(e.target.value, 'review')}/>
      
        </div>
        <div>
          <h2>My Rating</h2>
          <p>{rating}</p>
          <button onClick={()=>this.updateRating()}>Change Ratings</button>
          <input placeholder='change up that rating' onChange={e => this.handleUpdateState(e.target.value, 'rating')}/>
    
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    title: reduxState.title,
    img: reduxState.img,
    id: reduxState.id,
    bookId: reduxState.bookId
  }
}

const mapDispatchToProps = {
  updateBook
}

export default connect (mapStateToProps, mapDispatchToProps)(BookPage)