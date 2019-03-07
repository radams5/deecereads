const initialState = {
  id: 0,
  username: '',
  title: '',
  img: '',
  bookId: 0
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_BOOK = 'UPDATE_BOOK'



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

export default function reducer( state = initialState, action){
  const {type, payload} = action
  switch(type){
    case UPDATE_USER:
      const {id, username} = payload
      return{...state, id, username}
    case UPDATE_BOOK:
      const {title, img, id:bookId} = payload
      return{...state, title, img, bookId}
    default:
      return state
  }
}