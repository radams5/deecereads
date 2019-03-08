import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateGroup} from './../../ducks/reducer'



class Groups extends Component{
  constructor(){
    super()
    this.state = {
      groupArr: []
    }
  }
  componentDidMount(){
    this.pullGroup()
  }
  pullGroup = async () => {
    const {groupId} = this.props
    let body = {groupId: groupId}
    let res = await axios.post('/group', body)
    console.log(1111111111111, res.data)
    this.setState({
      groupArr: res.data
    })
  }
 



  render(){
    let members = this.state.groupArr.map((member) => {
      return <div>{member.username}</div>
    }) 
    
    return(
     <div> 
        <div>{this.props.groupName}</div>
        <div><img src={this.props.groupImg} alt={this.props.groupName}/></div>
        <div>Books Div</div>
        <div>
            Members
          {members}
        </div>
        <div>
          <button>Add Books</button>
          <button> Add Members</button>
        </div>
        <div>Message Members?</div>
      </div>
    )
  }
}
const mapStateToProps = (reduxState) =>{
  return {
    groupId: reduxState.groupId,
    groupImg: reduxState.groupImg,
    groupName: reduxState.groupName
  }
}
const mapDispatchToProps = {
  updateGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)