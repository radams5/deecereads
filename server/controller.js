const bcrypt = require('bcryptjs')

module.exports={


  getGroups: async (req, res) => {
    const {user_id} = req.body
    const db = req.app.get('db')
    let groups = await db.get_groups(user_id)
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
      return res.sendStatus(404)
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
    console.log(res.session)
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
    if (bookReview){
      res.status(200).send(bookReview)
    }
  }
}