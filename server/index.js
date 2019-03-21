const path = require('path')
require('dotenv').config()
const express = require('express'),
  massive = require('massive'),
  session= require('express-session'),
  pg = require('pg')
  pgSession = require('connect-pg-simple')(session)
  ctrl = require('./controller')
  
const app = express(),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
    


const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use( express.static( `${__dirname}/../build` ) );


app.use(express.json())
app.use(session({
  store: new pgSession({
    pool: pgPool,
    pruneSessionInterval: 60 * 60 *24
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 111111111111
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
  const PORT=SERVER_PORT
  app.listen(PORT, () => {console.log('sharpening your quill on 3003')})
}).catch((err)=>{
  console.log('massive cant connect', err)
})



//Endpoints

app.get('/user', ctrl.getUser)
app.post('/addToDatabase', ctrl.addToDatabase)
app.get('/current', ctrl.current)
app.get('/library', ctrl.library)
app.get('/wishList', ctrl.wishList)
app.post('/bookReview', ctrl.bookReview)
app.post('/register', ctrl.register)
app.post('/login', ctrl.login)
// app.post('/myGroups', ctrl.myGroups)
// app.post('/group', ctrl.getGroup)
app.put('/updateBookReview', ctrl.updateBookReview)
app.put('/updateBookRating', ctrl.updateBookRating)  
app.put('/addToLibrary', ctrl.addToLibrary)  
app.put('/addToWishList', ctrl.addToWishList)  
app.put('/addToCurrentlyReading', ctrl.addToCurrentlyReading)  
app.delete('/deleteBookCurrent/:bookId', ctrl.deleteBookCurrent)  
app.delete('/deleteBookLibrary/:bookId', ctrl.deleteBookLibrary)  
app.delete('/deleteBookWishList/:bookId', ctrl.deleteBookWishList) 

// https://www.googleapis.com/books/v1/volumes?q=isbn:<your_isbn_here>
// q=inauthor:jk+inauthor:rowling
// q=intitle:harry+intitle:potter

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});