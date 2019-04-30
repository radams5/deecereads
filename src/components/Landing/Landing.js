import React, {Component} from 'react'
import axios from 'axios'
import './Landing.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addBook, updateBook} from '../../ducks/reducer'



class Landing extends Component{
  constructor(){
    super()
    this.state = {
      BestSellersNonFiction: [],
      BestSellersFiction: [],
      currentBook: ''
    }
  }

  componentDidMount(){
    this.getBestSellers()
  }
  
  getBestSellers = async () => {
    let res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=MNQo2jhcDKGhq0bapkzfb0063kGyxsuE`)
    this.setState({
      BestSellersNonFiction: res.data.results.books
    }) 
    let res2 = await  axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=MNQo2jhcDKGhq0bapkzfb0063kGyxsuE')
    this.setState({
      BestSellersFiction: res2.data.results.books
    })
  }

  render(){
    let BestSellersNonFiction = this.state.BestSellersNonFiction.map((book) => { 
      return(        
        <div className='NYTBestsellerBookContainer'>                     
          <Link to={`/bookPage`}> 
            <button onClick={() => this.props.addBook(book)} className="BookButton">
              <img src={book.book_image} alt={book.title} className='NYTBestSellerBookImg'/> 
            </button>
          </Link>
     </div>
    )
})
   let BestSellersFiction = this.state.BestSellersFiction.map((book) => { 
    return(        
      <div className='NYTBestsellerBookContainer'>                     

          <Link to='/bookPage'>
            <button onClick={ () => this.props.addBook(book)} className="BookButton">
                 <img src={book.book_image} alt={book.title} className='NYTBestSellerBookImg'/> 
            </button>
           </Link>
          
     </div>
    )
})
    return(
      <div className='LandingMainDiv'>
        <div className="LandingPageBookshelfContainer">
           <div className='NYTBestsellers' >          
              <h2>BestSellers nonfiction</h2>
              <div className="NYTBestsellerContainer">{BestSellersNonFiction}</div>
            </div> 
        </div>
        <div className="LandingPageBookshelfContainer">
          <div className='NYTBestsellers' >             
            <h2>BestSellersFiction</h2>
            <div className="NYTBestsellerContainer">{BestSellersFiction}</div>
          </div>
        </div>
        <div className="LandingPageBookshelfContainer">
          <div className='NYTBestsellers' >   
              <h2>Featured Books</h2>
              <div className="FeaturedBooksContainer">
                <div className='FeaturedBook'>Your Book Here</div>
                <div className='FeaturedBook'>Featured Book2</div>
              </div>
          </div>
        </div>
            
          <div className='Footer'></div>
      </div>
    )
  }
}


const mapDispatchToProps = {
 addBook,
 updateBook
}


export default connect(null, mapDispatchToProps)(Landing) 