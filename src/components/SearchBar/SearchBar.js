import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {addGoogleBooks} from '../../ducks/reducer'

class SearchBar extends Component{
constructor(){
  super()
  this.state = {
    searchBar: '',
    titleCheck: false,
    authorCheck: false,
    ISBNCheck: false,
  }
}


  handleUpdateState(val, prop){
    this.setState({
      [prop]: val
    })
  }
  handleChecks(check, trueProp, falseProp1, falseProp2, inputName ){   
      var inputs = document.getElementsByTagName("input");
      for(var i = 0; i < inputs.length; i++) {
          if(inputs[i].type === "checkbox") { 
            if(inputs[i].name===inputName && inputs[i].checked!==check) {
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
      
 }
  handleGetGoogle = async (query) => {
    console.log(111111, this.props)
    if(this.props.location.pathname !== '/BookSearch'){
      this.props.history.push("/BookSearch")
    }
    try{
      let arr = query.split(" ")
      if (this.state.titleCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('intitle:' + word)
        })}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        // this.props.setSearchState(res.data.items, 'searchResults')
        this.props.addGoogleBooks(res.data.items)
      }
      if (this.state.authorCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('inauthor:' + word)
        }).join("+")}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        console.log(12341234, res)
        // this.props.setSearchState(res.data.items, 'searchResults')
        this.props.addGoogleBooks(res.data.items)
    }
      if (this.state.ISBNCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${process.env.REACT_APP_GOOGLEKEY}`)
        // this.props.setSearchState(res.data.items, 'searchResults')
        this.props.addGoogleBooks(res.data.items)
    }}catch(err){      
      console.log(err)
    }
    this.setState({
        searchBar: ''
      })
  }

  render(){
 console.log(this.props)
 console.log(process.env)
    
    return(
      <div>    
        <input placeholder='Title, Author, ISBN'  value={this.state.searchBar} onChange={e => this.handleUpdateState(e.target.value, 'searchBar')}/>
        <button onClick={() => this.handleGetGoogle(this.state.searchBar)}>search</button>

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

const mapStateToProps = (reduxState) => {
  return{
   googleBooks: reduxState.googleBooks
  }
} 
const mapDispatchToProps = {
  addGoogleBooks
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)


 /////////Refresh Functionality

 //////////Is withRouter just to give child components access to history.push?
 ///////// what happens to state when i hit refresh