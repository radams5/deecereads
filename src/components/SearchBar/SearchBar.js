import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import {Link} from 'react-router-dom'
import BookSearch from '../BookSearch/BookSearch';

class SearchBar extends Component{
constructor(){
  super()
  this.state = {
    searchBar: '',
    titleCheck: false,
    authorCheck: false,
    ISBNCheck: false,
    searchResults: []
  }
}
componentDidMount(){
  var inputs = document.getElementsByTagName("input");
      for(var i = 0; i < inputs.length; i++) {
          if(inputs[i].type == "checkbox") { 
              inputs[i].checked = false            
          
          }
      }
    }

  handleUpdateState(val, prop){
    this.setState({
      [prop]: val
    })
    console.log(this.state)
  }
  handleChecks(check, trueProp, falseProp1, falseProp2, inputName ){   
      var inputs = document.getElementsByTagName("input");
      for(var i = 0; i < inputs.length; i++) {
          if(inputs[i].type == "checkbox") { 
            if(inputs[i].name==inputName && inputs[i].checked!==check) {
              inputs[i].checked=check             
               
          }
          else {
              if(inputs[i].name!==inputName) {
                  inputs[i].checked = false; 
               }   
          }
          }        
        }
        if(check){
          this.setState({
            [trueProp]: true,
            [falseProp1]: false,
            [falseProp2]: false
          })
        }
        else if(!check){
          this.setState({
            [trueProp]: false
          })}
          console.log(this.state)
 }
  handleGetGoogle = async (query) => {
    console.log(222222, query)
    let res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:jk+inauthor:rowling&key=AIzaSyDou-rWY8KTpFX3CcbtHcAqJ6jnnzN0vd8')
    console.log(33333, res.data.items)
    this.props.setSearchResults(res.data.items)
  }

  render(){
 
    
    return(
      <div>    
        <input placeholder='book title' onChange={e => this.handleUpdateState(e.target.value, 'searchBar')}/>
        <Link to='/BookSearch'><button onClick={() => this.handleGetGoogle(this.state.searchBar)}>search</button></Link>

        <div className='CheckBoxesDiv'>
          <input type="checkbox" 
            id="title" 
            name="title" 
            onChange={ e => { this.handleChecks(e.target.checked, 'titleCheck', 'authorCheck', 'ISBNCheck', e.target.name)          
            }}
          />
          <label for="title">Title</label>
          <input 
            type="checkbox" 
            id="author" 
            name="author" 
            onChange={ e => { this.handleChecks(e.target.checked, 'authorCheck', 'ISBNCheck', 'titleCheck', e.target.name)          
            }}
          />
          <label for="author">Author</label>
          <input 
            type="checkbox" 
            id="ISBN" 
            name="ISBN" 
            onChange={ e => { this.handleChecks(e.target.checked, 'ISBNCheck', 'titleCheck', 'authorCheck', e.target.name)          
            }}
          />
          <label for="ISBN">ISBN</label>
        </div>
      </div>
    )
  }
}
export default SearchBar
