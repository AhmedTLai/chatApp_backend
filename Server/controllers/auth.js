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
          if (err) return res.status(500).json({ message: 'An error occurred, try again later' ,err : err});
          else {
            res.status(200).json({ message: 'User added' });
          }
        });
      } 
    });
  };   


  const LoginContr = (req, res) => {
    // Check email user if exist
    const emailQ = 'SELECT * FROM users WHERE email=?';
  
    db.query(emailQ, [req.body.email], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      
      if (result.length > 0) {
        // Compare password
        const passwordCheck = bcrypt.compareSync(req.body.password, result[0].password);
        const { password, ...others } = result[0];
  
        if (passwordCheck) {
          const token = jwt.sign({ id: others.id }, 'user_token');
          const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
  
          const setOnlineStatusQ = 'UPDATE users SET is_online=1 WHERE email=?';
          db.query(setOnlineStatusQ, [req.body.email], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            }
  
            res.cookie('user_token', token, {
              httpOnly: true,
              secure: true,
            }).json({ data: others, auth: true });
          });
        } else {
          res.status(301).json({ message: 'Password incorrect. Please try again.', auth: false });
        }
      } else {
        res.status(301).json({ message: 'Email is undefined. Please try another one or try registering an account.', auth: false });
      }
    });
  };

const LogoutContr = (req, res) => {
  const desconnectStatuQ = 'UPDATE users SET is_online=0 WHERE user_id=?'
  try {

    db.query(desconnectStatuQ,[req.params.user_id],(err,result)=>{
      if(err) {
        return res.status(500).json(err)
      }
      if(result){
         res.clearCookie('user_token', { httpOnly: true }); // Use 'httpOnly' instead of 'Credential'
        res.end();
      }
    })
   
  } catch (err) {
    console.log(err);
  }
}


module.exports = {RegisterContr,LoginContr,LogoutContr}
