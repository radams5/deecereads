const initialState = {
  id: 0,
  username: '',
  title: '',
  img: '',
  bookId: 0,
  groupId: 0
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_BOOK = 'UPDATE_BOOK'
const UPDATE_GROUP = 'UPDATE_GROUP'


export function updateUser(user){
  return {
    type: UPDATE_USER,
    payload: user
  }
}
export function updateBook(book){
  console.log('qqqqqqqqq', book)
  return {
    type: UPDATE_BOOK,
    payload: book
  }
}
export function updateGroup(group){
  console.log('ioioioi', group)
  return{
    type: UPDATE_GROUP,
    payload: group
  }
}

export default function reducer( state = initialState, action){
  const {type, payload} = action
  switch(type){
    case UPDATE_USER:
      const {id, username} = payload
      return{...state, id, username}
    case UPDATE_BOOK:
      const {title, img, id:bookId} = payload
      return{...state, title, img, bookId}
    case UPDATE_GROUP:
      const {id:groupId, img:groupImg, group_name:groupName} = payload
      return{...state, groupId, groupImg, groupName}
    default:
      return state
  }
}