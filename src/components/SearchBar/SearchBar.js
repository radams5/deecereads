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
 handleClearChecks(){
  var inputs = document.getElementsByTagName("input");
  for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].type === "checkbox") { 
        if(inputs[i].checked===true) {
          inputs[i].checked=false            
        }
      }
 }
}
  handleGetGoogle = async (query) => {
    if(this.props.location.pathname !== '/BookSearch'){
      this.props.history.push("/BookSearch")
    }
    try{
      if(this.state.titleCheck===false && this.state.authorCheck===false && this.state.ISBNCheck===false){alert('please select a search field')} else{
        let arr = query.split(" ")
      if (this.state.titleCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('intitle:' + word)
        })}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        this.props.addGoogleBooks(res.data.items)
      }
      if (this.state.authorCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
        ${arr.map( word => {
          return ('inauthor:' + word)
        }).join("+")}
        &key=${process.env.REACT_APP_GOOGLEKEY}`)
        // this.props.setSearchState(res.data.items, 'searchResults')
        this.props.addGoogleBooks(res.data.items)
      }
      if (this.state.ISBNCheck===true){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${process.env.REACT_APP_GOOGLEKEY}`)
        // this.props.setSearchState(res.data.items, 'searchResults')
        this.props.addGoogleBooks(res.data.items)
      }
    }
    }catch(err){      
      console.log(err)
    }
    this.setState({
        searchBar: '',
        titleCheck: false,
        authorCheck: false,
        ISBNCheck: false,
      })
    this.handleClearChecks()
    console.log(11111, this.state)
  }

  render(){
    
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


// make search bar clear check box when its clicked
// login register alerts
// review blank input alert
