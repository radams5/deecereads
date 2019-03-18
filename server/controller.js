const bcrypt = require('bcryptjs')

CTRL={

////////////// GETS USER LOGGED IN ////////////////////
  

  register: async (req, res) => {
    const {username, password} = req.body
    const {session} = req
    const db = req.app.get('db')
    let takenUsername = await db.check_username({username})
    
    takenUsername = +takenUsername[0].count
    if( takenUsername !== 0){
      return res.sendStatus(409)
    }
    
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    
    let user = await db.register({username, password: hash})
    user = user[0]
    
    session.user = user
    res.status(200).send(session.user)
  },

  login: async (req, res) => {
    const {username, password} = req.body
    const {session} = req
    const db = req.app.get('db')

    let user = await db.login({username})
    user = user[0]
    if (!user) {
      return res.sendStatus(401)
    }
    
    let authenticated = bcrypt.compareSync(password, user.password)
    if (authenticated) {
      delete user.password
      session.user = user
      res.status(200).send(session.user)
    } else {
      res.sendStatus(401)
    }
  },
  getUser: (req, res) => {
    const {user} = req.session
    if(user){
      res.status(200).send(user)
    }else{
      res.sendStatus(401)
    }
  },


  ///////////////PULL USERS INFO /////////
  
  
  getGroup: async (req, res) => {
    const {groupId} = req.body
    const db = req.app.get('db')
    let groupMembers = await db.get_groups({groupId})
    res.status(200).send(groupMembers)
  },
  
  
  current: async (req, res) => {    
    const {id} = req.session.user
    const db = req.app.get('db')
    let current = await db.UserPageRequests.currently_reading({id})
    if (current){
      res.status(200).send(current)
    } 
  },
  myGroups: async (req, res) => {    
    const {id} = req.session.user  
    const db = req.app.get('db')
    let myGroups = await db.UserPageRequests.my_groups({id})
    if (myGroups){
      res.status(200).send(myGroups)
    } 
  },
  library: async (req, res) => {    
    const {id} = req.session.user  
    const db = req.app.get('db')
    let library = await db.UserPageRequests.library({id})
    if (library){
      res.status(200).send(library)
    } 
  },
  wishList: async (req, res) => {    
    const {id} = req.session.user  
    const db = req.app.get('db')
    let wishList = await db.UserPageRequests.wish_list({id})
    if (wishList){
      res.status(200).send(wishList)
    } 
  },
  bookReview: async (req, res) => {
    const {id, bookId} = req.body
    console.log(bookId)
    const db = req.app.get('db')
    let bookReview = await db.BookPageRequests.book_review({id, bookId})
    bookReview = bookReview[0]
    console.log(12341234123412341324, bookReview)
    if (bookReview){
      res.status(200).send(bookReview)
    }
  },

 

////////////////ADD BOOKS TO A PROFILE////////


  addToCurrentlyReading: async (req, res) => {
      try{
        const {bookId} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        let newCurrentlyReading = await db.BookPageRequests.update_currently_reading({id, bookId})
        res.status(200).send(newCurrentlyReading)
      }catch(err){
        console.log(err)
      }   
  },

  addToLibrary: async (req, res) => {
    try{
      const {bookId} = req.body
      const {id} = req.session.user
      const db = req.app.get('db')
      let newLibrary = await db.BookPageRequests.update_library({id, bookId})
      res.status(200).send(newLibrary)
    }catch(err){
      console.log(err)  
    }    
  },
  addToWishList: async (req, res) => {
    try{
      const {bookId} = req.body
      const {id} = req.session.user
      const db = req.app.get('db')
      let newWishList = await db.BookPageRequests.update_wish_list({id, bookId})
      res.status(200).send(newWishList)
    }catch(err){
      console.log(err)
      } 
  },

  /////////////////DELETE BOOOKS ///////////////////
  
  deleteBookCurrent: async (req, res) => {
    try {
      const {bookId} = req.params
      const userId = req.session.user.id
      const db = req.app.get('db')
      let newCurrentlyReading = await db.UserPageRequests.delete_currently_reading(userId, bookId)
      console.log(newCurrentlyReading)     
      res.sendStatus(200)
      } catch(err){
      console.log(err)
    }
  },
  deleteBookLibrary: async (req, res) => {
    try {
      const {bookId} = req.params
      const userId = req.session.user.id
      const db = req.app.get('db')
      let newLibrary = await db.UserPageRequests.delete_library(userId, bookId)
      console.log(newLibrary)
        res.status(200).send(newLibrary)
      } catch(err){
      console.log(err)
    }
  },
  deleteBookWishList: async (req, res) => {
    try {
      const {bookId} = req.params
      const userId = req.session.user.id
      const db = req.app.get('db')
      let newWishList = await db.UserPageRequests.delete_wish_list(userId, bookId)      
      res.sendStatus(200)
      } catch(err){
      console.log(err)
    }
  },

  ////////////Update////////////////////
 
  updateBookReview: async (req, res) => {
    const {id, bookId, review} = req.body
    const db = req.app.get('db')
    console.log(111111, req.body)
    try{
      let exists = await db.BookPageRequests.check_review_exists({id, bookId})
      exists = +exists[0].count
      console.log(3333333333, exists)
      if (exists > 0){
        console.log('hit')      
        let bookReview = await db.BookPageRequests.update_book_review({review, id, bookId})
        bookReview = bookReview[0]
        res.status(200).send(bookReview)} 
        else {  
          console.log('hit number 2')    
          let bookReview = await db.BookPageRequests.add_book_review({review, id, bookId})
          console.log(4444444444, bookReview)
        bookReview = bookReview[0]
        res.status(200).send(bookReview)
      }} catch(err){
      console.log(err)
    }  
},
  updateBookRating: async (req, res) => {
    const {id, bookId, rating} = req.body
    const db = req.app.get('db')
    try{
      let exists = await db.BookPageRequests.check_review_exists({id, bookId})
      exists = +exists[0].count
      console.log(3333333333, exists)
      if (exists > 0){      
        let bookRating = await db.BookPageRequests.update_book_rating({rating, id, bookId})
        bookRating = bookRating[0]
        console.log(44444444444, bookRating)
        res.status(200).send(bookRating)} 
      else if(!exists) {  
      console.log('hit')    
        let bookRating = await db.BookPageRequests.add_book_rating({rating, id, bookId})
        bookRating = bookRating[0]
        res.status(200).send(bookRating)
      }} catch(err){
      console.log(err)
    }  
},
 

  //////////////////Datbase///////////////
  addToDatabase: async (req, res) => {
    try{
    const {isbn, title, img, summary} = req.body
    const db = req.app.get('db')
    let bookExists = await db.BookPageRequests.check_book_exists({isbn})
    if (!bookExists[0]){
      let addedBookToDb = await db.BookPageRequests.added_book_to_db({title, img, isbn, summary})
      console.log('sending new book')
      res.status(200).send(addedBookToDb)
    } else {
      console.log('sending old book')
      res.status(200).send(bookExists)
    }} catch (err){
      console.log(err)
    }
  },
}  

module.exports = CTRL