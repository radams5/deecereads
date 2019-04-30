import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {addGoogleBooks} from '../../ducks/reducer'
import './SearchBar.css'

class SearchBar extends Component{
constructor(){
  super()
  this.state = {
    searchBar: '',
    selectedValue: 'title'
  }
}


  handleUpdateState(val, prop){
    this.setState({
      [prop]: val
    })
    console.log(this.state)
  }


  handleGetGoogle = async (query) => {
    console.log(this.state)
    if(this.props.location.pathname !== '/BookSearch'){
      this.props.history.push("/BookSearch")
    }
    try{

      let arr = query.split(" ")
      let res;
      switch (this.state.selectedValue) {
        case "author":
         res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('inauthor:' + word)
        }).join("+")}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        this.props.addGoogleBooks(res.data.items)
          break;
          case "title":
           res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('intitle:' + word)
        })}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        this.props.addGoogleBooks(res.data.items)
          break;
          case "isbn":
           res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${process.env.REACT_APP_GOOGLEKEY}`)
          this.props.addGoogleBooks(res.data.items)
          break;      
        default:
          break;
      }

    }catch(err){      
      console.log(err)
    }
    this.setState({
        searchBar: '',
      })  

  }

  render(){
  
    return(
      <div className='SearchBarDiv'> 
        <select className='SearchBarSelections' onChange={(e) => this.handleUpdateState(e.target.value, 'selectedValue')}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
        </select>   
        <input 
          className='SearchBarInput'
          type="text" 
          placeholder='Title, Author, ISBN'  value={this.state.searchBar} 
          onChange={e => this.handleUpdateState(e.target.value, 'searchBar')}
        />
        <button onClick={() => this.handleGetGoogle(this.state.searchBar)} className='SearchBarButton'>Search</button>
      
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
   googleBooks: reduxState.googleBooks
  }
} 
const mapDispatchToProps = {
  addGoogleBooks
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)


