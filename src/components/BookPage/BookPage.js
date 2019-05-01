import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBook} from './../../ducks/reducer'
import axios from 'axios';
import {Button} from 'antd'
import './BookPage.css'



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
      if(this.props.id){try{
        const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToCurrentlyReading', body)
      alert('added to Currently Reading')
    }catch(err){
      }}else{alert('Please Login or Register')}
    }
    addToLibrary = async () => {
     if(this.props.id){ try {
        const {id, bookId} = this.props
        let body = { id: id, bookId: bookId}
        await axios.put('/addToLibrary', body)
        alert('added to library')
      }catch(err){
      }}else{alert('Please Login or Register')}
    }
    addToWishList = async () => {
     if(this.props.id){ try{
      const {id, bookId} = this.props
      let body = { id: id, bookId: bookId}
      await axios.put('/addToWishList', body)
      alert('added to Wish List')
    }catch(err){
      }
    }else{alert('Please Login or Register')}
  }   



  render(){
  console.log(this)

    return(
      <div>
      <div className="BookPageMainDiv">
      
        <img src={this.props.img} alt={this.props.title} className='SearchImage'/>
        <div className="dropdown">
          <h3>Add Book to</h3>
          <div className='dropdownContent'>
            <Button onClick={() => this.addToCurrentlyReading()}>Currently Reading</Button>
            <Button onClick={() => this.addToLibrary()}>Library</Button>
            <Button onClick={() => this.addToWishList()}>Wish List</Button>
          </div>
        </div>
        <h1>{this.props.title}</h1>
        <h4>Description:</h4>
        <p className='SummaryDiv'>{this.props.summary ? this.props.summary : 'No summary from Google Books API'}</p>
        
        {/* <div>
          <h2>My Review</h2>
          <p>{review}</p>
          <Button onClick={()=>this.updateReview()}>Update Review</Button>
          <input placeholder='Update Review' value={this.state.review} onChange={e => this.handleUpdateState(e.target.value, 'review')}/>
      
        </div>
        <div>
          <h2>My Rating</h2>
          <p>{rating}/10</p>
          <Button onClick={()=>this.updateRating()}>Change Ratings</Button>
          <input type="integer" placeholder='change up that rating' value={this.state.rating} onChange={e => this.handleUpdateState(e.target.value, 'rating')}/>
    
        </div> */}
        </div>
        <div className="Footer"></div>
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