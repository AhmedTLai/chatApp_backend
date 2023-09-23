const express = require('express')
const app = express()
// const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const db = require('./db')
const Contact = require('./routes/Contact')
const Messages = require('./routes/messages')

const origins = 'http://192.168.1.17:5173'

//using the middlewere ----------------
app.use(cors({origin : 'http://127.0.0.1:5173' , credentials : true}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
  req.headers["access-control-allow-credentials", true]
  req.headers['authorization',true]

  next() 
})
//server config ---------------
const port = 3000  
// const server = http.createServer(app) 


//-------------------------------------------------------------------------------------------------


//just space for clean code .


//db connection ----------------------



// Routes ---------------------------
app.use('/api/auth',auth)
app.use('/api/user',Contact)
app.use('/api/messenger',Messages)

// listning to server -------------------
// module.exports = server
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
  
    app.listen(port, () => {
      console.log('Server is running');
    });
  });
