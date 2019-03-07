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
})



//Endpoints

app.get('/user/groups', ctrl.getGroups)
app.get('/users', ctrl.getUsers)
app.post('/current', ctrl.current)
app.post('/myGroups', ctrl.myGroups)
app.post('/library', ctrl.library)
app.post('/wishList', ctrl.wishList)
app.post('/bookReview', ctrl.bookReview)
app.post('/register', ctrl.register)
app.post('/login', ctrl.login)
  


