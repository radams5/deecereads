import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'



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
    let res = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=MNQo2jhcDKGhq0bapkzfb0063kGyxsuE')
    console.log(res.data)
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
     console.log(this.state)
    return(        
      <div className='NYTBestsellerBookContainer'>                     
          <div>{book.title}</div>
          <div>{book.author}</div>
          <Link to={`/bookPage`}> <img src={book.book_image} alt={book.title} className='NYTBestSellerBookImg'/> </Link>
     </div>
    )
})
   let BestSellersFiction = this.state.BestSellersFiction.map((book) => { 
    return(        
      <div className='NYTBestsellerBookContainer'>                     
          <div>{book.title}</div>
          <div>{book.author}</div>
          <Link to='/bookPage'> <img src={book.book_image} alt={book.title} className='NYTBestSellerBookImg'/> </Link>
          
     </div>
    )
})
    return(
      <div className='LandingMainDiv'>
      
        <div className='NYTBestsellers' >
          
              <h2>BestSellers nonfiction</h2>
              {BestSellersNonFiction}
            
        </div>
        <div className='NYTBestsellers' > 
        
            <h2>BestSellersFiction</h2>
            {BestSellersFiction}
          
        </div>
        <div>
          <div className='FeaturedBook'>Featured Book1</div>
          <div className='FeaturedBook'>Featured Book2</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (reduxState) => {
  return{
    username: reduxState.username,
    id: reduxState.id
  }
}
const mapDispatchToProps = {
  
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing) 