import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {addGoogleBooks} from '../../ducks/reducer'
import {Input, Select, Icon} from 'antd'
const Option = Select.Option;

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
  }


  handleGetGoogle = async (query) => {
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
      this.props.toggleSearch()
  }

  render(){
    const selectBefore = (
      <Select onChange={(value) => this.handleUpdateState(value, 'selectedValue')} defaultValue="title" style={{ width: 90 }}>
        <Option value="title">Title</Option>
        <Option value="author">Author</Option>
        <Option value="isbn">ISBN</Option>
      </Select>
    );
    return(
      <div>    
        <Input placeholder='Title, Author, ISBN'
          addonBefore={selectBefore} 
          addonAfter={<Icon onClick={() => this.handleGetGoogle(this.state.searchBar)} type="search" />}   value={this.state.searchBar} onChange={e => this.handleUpdateState(e.target.value, 'searchBar')}
          className='AntDSearchBar'
        />

      
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


