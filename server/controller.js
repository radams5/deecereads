const bcrypt = require('bcryptjs')

module.exports={


  getGroup: async (req, res) => {
    const {groupId} = req.body
    const db = req.app.get('db')
    let groupMembers = await db.get_groups({groupId})
    res.status(200).send(groupMembers)
  },

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
    // console.log(password, user.password)
    // console.log(authenticated)
    //Ask why the above isnt authenticating
    if (authenticated) {
      delete user.password
      session.user = user
      res.status(200).send(session.user)
      // console.log(session.user)
    } else {
      res.sendStatus(401)
    }
  },
  getUsers: (req, res) => {
    const {user} = req.session
    if(user){
      res.status(200).send(user)
    }else{
      res.sendStatus(401)
    }
  },
  current: async (req, res) => {    
    const {id} = req.body    
    const db = req.app.get('db')
    let current = await db.UserPageRequests.currently_reading({id})
    if (current){
      res.status(200).send(current)
    } 
  },
  myGroups: async (req, res) => {    
    const {id} = req.body    
    const db = req.app.get('db')
    let myGroups = await db.UserPageRequests.my_groups({id})
    if (myGroups){
      res.status(200).send(myGroups)
    } 
  },
  library: async (req, res) => {    
    const {id} = req.body    
    const db = req.app.get('db')
    let library = await db.UserPageRequests.library({id})
    if (library){
      res.status(200).send(library)
    } 
  },
  wishList: async (req, res) => {    
    const {id} = req.body    
    const db = req.app.get('db')
    let wishList = await db.UserPageRequests.wish_list({id})
    if (wishList){
      res.status(200).send(wishList)
    } 
  },
  bookReview: async (req, res) => {
    const {id, bookId} = req.body
    const db = req.app.get('db')
    let bookReview = await db.BookPageRequests.book_review({id, bookId})
    bookReview = bookReview[0]
    if (bookReview){
      res.status(200).send(bookReview)
    }
  },
  updateBookReview: async (req, res) => {
    const {id, bookId, review} = req.body
    const db = req.app.get('db')
    let bookReview = await db.BookPageRequests.update_book_review({id, bookId, review})
    bookReview = bookReview[0]
    if(bookReview){
      res.status(200).send(bookReview)
    }
  },
  updateBookRating: async (req, res) => {
    const {id, bookId, rating} = req.body
    const db = req.app.get('db')
    let bookRating = await db.BookPageRequests.update_book_rating({id, bookId, rating})
    bookRating = bookRating[0]
    if(bookRating){
      res.status(200).send(bookRating)
    }
  },
  addToLibrary: async (req, res) => {
    console.log('hit')
    const {id, bookId} = req.body
    const db = req.app.get('db')
    let newLibrary = await db.BookPageRequests.update_library({id, bookId})
    newLibrary = newLibrary[0]
    if(newLibrary){
      res.status(200).send(newLibrary)
    }
  },
  addToWishList: async (req, res) => {
    const {id, bookId} = req.body
    const db = req.app.get('db')
    let newWishList = await db.BookPageRequests.update_wish_list({id, bookId})
    newWishList = newWishList[0]
    if(newWishList){
      res.status(200).send(newWishList)
    }
  },
  addToCurrentlyReading: async (req, res) => {
    const {id, bookId} = req.body
    const db = req.app.get('db')
    let newCurrentlyReading = await db.BookPageRequests.update_currently_reading({id, bookId})
    newCurrentlyReading = newCurrentlyReading[0]
    if(newCurrentlyReading){
      res.status(200).send(newCurrentlyReading)
    }
  },
  deleteBookCurrent: async (req, res) => {
    const {id, isbn} = req.body
    const db = req.app.get('db')
    let newCurrentlyReading = await db.UserPageRequests.delete_currently_reading({id, isbn})
    newCurrentlyReading = newCurrentlyReading[0]
    if(newCurrentlyReading){
      res.status(200).send(newCurrentlyReading)
    }
  },
  // deleteBookLibrary: async (req, res) => {
  //   const {isbn} = req.body
  //   const db = req.app.get('db')
  //   let newLibrary = await db.UserPageRequests.delete_library({bookId, isbn})
  //   newLibrary = newLibrary[0]
  //   if(newLibrary){
  //     res.status(200).send(newLibrary)
  //   }
  // },
  // deleteBookwishList: async (req, res) => {
  //   const {isbn, bookId} = req.body
  //   const db = req.app.get('db')
  //   let newWishList = await db.UserPageRequests.delete_wish_list({bookId, isbn})
  //   newWishList = newWishList[0]
  //   if(newWishList){
  //     res.status(200).send(newWishList)
  //   }
  // },
 
}