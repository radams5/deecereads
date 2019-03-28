const initialState = {
  id: 0,
  username: '',
  title: '',
  img: '',
  bookId: 0,
  groupId: 0,
  isbn: 0,
  summary: '',
  googleBooks: []
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_BOOK = 'UPDATE_BOOK'
const UPDATE_GROUP = 'UPDATE_GROUP'
const ADD_BOOK = 'ADD_BOOK'
const ADD_GOOGLE_BOOKS = 'ADD_GOOGLE_BOOKS'


export function updateUser(user){
  return {
    type: UPDATE_USER,
    payload: user
  }
}
export function updateBook(book){
  return {
    type: UPDATE_BOOK,
    payload: book
  }
}
export function updateGroup(group){
  return{
    type: UPDATE_GROUP,
    payload: group
  }
}
export function addBook(book){
  
  return{
    type: ADD_BOOK,
    payload: book
  }
}
export function addGoogleBooks(arr){
  return{
    type: ADD_GOOGLE_BOOKS,
    payload: arr
  }
}

export default function reducer( state = initialState, action){
  const {type, payload} = action
  switch(type){
    case UPDATE_USER: {
      const {id, username} = payload
    return{...state, id, username}}
    case UPDATE_BOOK: {
      const {title, img, id:bookId, isbn, summary} = payload
    return{...state, title, img, bookId, isbn, summary}}
    case UPDATE_GROUP:{
      const {id:groupId, img:groupImg, group_name:groupName} = payload
    return{...state, groupId, groupImg, groupName}}
    case ADD_BOOK: {
      const {title, book_image, primary_isbn10, description} = payload
      const img = book_image  
      const summary = description    
      const isbn = primary_isbn10
    return{...state, title, img, isbn, summary}}
    case ADD_GOOGLE_BOOKS: {
      const googleBooks = payload
    return{...state, googleBooks}}
    default:
    return state
    }
  }