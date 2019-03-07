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
      bookReviewArr: []
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
      bookReviewArr: res.data
    })
  }



  render(){
    // console.log(this.state.bookReviewArr)
    return(
      <div>
        <div>{this.props.title}</div>
        <img src={this.props.img} alt={this.props.title}/>
        <div>Book Summary</div>
        
        <div>My Review</div>
        <div>My Rating</div>
        <div>Tags</div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  console.log(11111111, {reduxState})
  return {
    title: reduxState.title,
    img: reduxState.img,
    id: reduxState.Id
  }
}

const mapDispatchToProps = {
  updateBook
}

export default connect (mapStateToProps, mapDispatchToProps)(BookPage)