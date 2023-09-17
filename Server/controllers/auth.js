const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const RegisterContr = (req, res) => {
    // check if user exists or not
    const checkUserQ = 'SELECT * FROM users WHERE email=?';
    const email = req.body.email;
    
    db.query(checkUserQ, [email], (err, data) => {
      if (err) return res.status(500).json(err);
      else if (data.length > 0) {
        res.status(409).json({ message: 'User already exists' });
      } else {
        // insert into table users
        // hash password
        if(req.body.password.length < 8 ){
          return res.status(400).json({message : 'Password must be more than 8 chars !'})
        }
        const salt = bcrypt.genSaltSync(12);
        const password = bcrypt.hashSync(req.body.password, salt);
         // Define the 'email' variable correctly
        const fullname = req.body.fullname; // Define the 'name' variable correctly
  
        const insertUserQ = 'INSERT INTO users(fullname, email, password) VALUES (?, ?, ?)';
  
        db.query(insertUserQ, [fullname, email, password], (err, result) => {
          if (err) return res.status(500).json({ message: 'An error occurred, try again later' });
          else {
            res.status(200).json({ message: 'User added' });
          }
        });
      } 
    });
  };   


const LoginContr = (req,res)=>{ 
//check email user if exist
  const emailQ = 'SELECT * FROM users WHERE email=?'

  db.query(emailQ,[req.body.email],(err,result)=>{
    if(err) return res.status(500).json(err)
    if(result.length > 0){
      //compare password
      const passwordCheck = bcrypt.compareSync(req.body.password,result[0].password)
      const {password , ...others} = result[0]
      if(passwordCheck){
        
          const token = jwt.sign({id : others.id},'user_token')
          const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
          
         return  res.cookie('user_token',token,{
            httpOnly: true,
            secure : true, 
          }).status(200).json({data : others,auth : true})

      }
      
     return res.status(301).json({message :'password incorect please try again .',auth : false}) 
    }
    return res.status(301).json({message : 'email is undefined please try auther one or try register an account .',auth : 'false'})
  })
}  

const LogoutContr = (req, res) => {
  try {
    res.clearCookie('user_token', { httpOnly: true }); // Use 'httpOnly' instead of 'Credential'
    res.end();
  } catch (err) {
    console.log(err);
  }
}


module.exports = {RegisterContr,LoginContr,LogoutContr}