const db = require('../db')


const sendMessage = (req,res)=>{
 
    const user_id = req.body.user_id
    const room_id = req.body.room_id
    const message = req.body.message

  
    const SendMessageQ = 'INSERT INTO convertation(sender_id,last_message,room_id) VALUES(?,?,?)'
  
    

    db.query(SendMessageQ, [user_id, message, room_id], (err, data) => {
      if (err) {
          res.status(500).json(err); // Send an error response
      } else if (data) {
          res.status(200).json('sent'); // Send a success response
      } else {
          res.status(400).json('cant send this message'); // Send a failure response
      }
  });


}

const getMessages = (req, res) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const getMQ = 'SELECT * FROM convertation WHERE (sender_id=? AND room_id=?) OR (sender_id=? AND room_id=?)     '

    const CheckQ = 'SELECT * FROM rooms WHERE (user_1=? AND user_2=?) OR (user_1=? AND user_2=?)'
    const InsertRoomQ = 'INSERT INTO rooms(user_1,user_2) VALUES(?,?)'
    const getUsers = 'SELECT * FROM users WHERE user_id=?'
  db.query(CheckQ,[user1_id,user2_id,user2_id,user1_id],(err,result)=>{
    if(err) res.status(500).json(err)
    if(result.length > 0) {
       
      // console.log(result)
      db.query(getMQ,[user1_id,user2_id,user2_id,user1_id],(err,data)=>{
        if(err) res.status(500).json(err)
        if(data.length > 0){
          // console.log(data)
          // const friend = data.find((e)=>{
          //   return e.room_id != user1_id
          // })
          // if(friend){
          //   db.query(getUsers,[friend.room_id],(err,user)=>{
          //   if(err) res.status(500).json(err)
          //  if(user.length > 0)
    
          res.status(200).json(data)
          
          // })
         
          // }
          

          
           
        }else{
          res.status(204).json('no messages inside')
        }
      })
     
    
    }
    else{
      db.query(InsertRoomQ,[user1_id,user2_id],(err,data)=>{
        if(err) res.status(500).json(err)
        db.query(CheckQ,[user1_id,user2_id,user2_id,user1_id],(err,result)=>{
          if(err) res.status(500).json(err)
          if(result.length > 0) {
            
            console.log(result)
           
          
          }})
      })
    }
  })
  
    // db.query(getMQ, [room_id], (err, data) => {
    //   if (err) {
    //     // Handle the database error and return an error response
    //     res.status(500).json({ error: 'Database error' });
    //   } else {
    //     if (data.length > 0) {
    //       // If messages are found, return them
    //       res.status(200).json(data);
    //     } else {
    //       // If no messages are found, return a 204 status code
    //       res.status(204).json('No messages found!');
    //     }
    //   }
    // });
  };

module.exports = {sendMessage,getMessages}