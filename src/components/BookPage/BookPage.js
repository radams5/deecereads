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
      rating: 0,
      searchBar: ''
    }
  }
   async componentDidMount(){
  await this.addToDatabase()
  await this.pullBookReview()
  }
  // componentDidUpdate(prevProps){
  //   if (this.props !== prevProps){
  //     this.forceUpdate()
  //   }
  // }

////////////////Pull DATA


  addToDatabase = async () => {
    const {isbn, title, img, summary} = this.props
    let body = {isbn: isbn, title: title, img:img, summary:summary}
    let res = await axios.post(`/addToDatabase`, body)
    this.props.updateBook(res.data[0])
  }
  pullBookReview = async () => {
    const {id, bookId} = this.props
    let body = { id: id, bookId: bookId }
    let res = await axios.post('/bookReview', body)
    
    this.setState({
      bookReview: res.data
    })
  }
//////////////////Updates

  updateReview = async () => {
    const {id, bookId} = this.props
    const {review} = this.state
    let body = { id: id, bookId: bookId, review}
    let res = await axios.put('/UpdateBookReview', body)
    this.setState({
      bookReview: res.data,
      review: ''
    })
    }
  updateRating = async () => {
    const {id, bookId} = this.props
    const {rating} = this.state
    let body = { id: id, bookId: bookId, rating}
    let res = await axios.put('/UpdateBookRating', body)
    this.setState({
      bookReview: res.data,
      rating: 0
    })
    }

    handleUpdateState(val, prop){
      this.setState({
        [prop]: val
      })
    }
////////////////////ADDS

    addToCurrentlyReading = async () => {
      try{
        const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToCurrentlyReading', body)
      alert('added to Currently Reading')
    }catch(err){
      }
    }
    addToLibrary = async () => {
      try {
        const {id, bookId} = this.props
        let body = { id: id, bookId: bookId}
        await axios.put('/addToLibrary', body)
        alert('added to library')
      }catch(err){
      }
    }
    addToWishList = async () => {
      try{
      const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToWishList', body)
      alert('added to Wish List')
    }catch(err){
      }
    }   



  render(){
    let review = this.state.bookReview.review ? this.state.bookReview.review : ''
    let rating = this.state.bookReview.rating ? this.state.bookReview.rating : ''

    return(
      <div>
      <div className="BookPageMainDiv">
      
        <img src={this.props.img} alt={this.props.title}/>
        <div className="dropdown">
          <button className="dropdwnbutton">Add to</button>
          <div className='dropdownContent'>
            <button onClick={() => this.addToCurrentlyReading()}>Currently Reading</button>
            <button onClick={() => this.addToLibrary()}>Library</button>
            <button onClick={() => this.addToWishList()}>Wish List</button>
          </div>
        </div>
        <h1>{this.props.title}</h1>
        <h4>Description:</h4>
        <p>{this.props.summary}</p>
        
        <div>
          <h2>My Review</h2>
          <p>{review}</p>
          <button onClick={()=>this.updateReview()}>Update Review</button>
          <input placeholder='Update Review' value={this.state.review} onChange={e => this.handleUpdateState(e.target.value, 'review')}/>
      
        </div>
        <div>
          <h2>My Rating</h2>
          <p>{rating}/10</p>
          <button onClick={()=>this.updateRating()}>Change Ratings</button>
          <input type="integer" placeholder='change up that rating' value={this.state.rating} onChange={e => this.handleUpdateState(e.target.value, 'rating')}/>
    
        </div>
        </div>
        <div>footer</div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    title: reduxState.title,
    img: reduxState.img,
    id: reduxState.id,
    bookId: reduxState.bookId,
    isbn: reduxState.isbn,
    summary: reduxState.summary
  }
}

const mapDispatchToProps = {
  updateBook
}

export default connect (mapStateToProps, mapDispatchToProps)(BookPage)