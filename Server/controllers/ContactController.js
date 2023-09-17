const db = require('../db')


const FrindsToSearch = (req, res) => {
    // Searching for a user to get the info from it
    const getUsersQ = "SELECT * FROM users WHERE fullname LIKE ? AND user_id != ?";
  
    db.query(getUsersQ,[req.body.inp + '%',req.body.user_id],(err,data)=>{
      if (err) res.status(500).json(err)
      if(data.length > 0){
        res.status(200).json(data)
      }else{
        res.status(203).json('no data')
      }
    })
  };

const checkFriendship = (req, res) => {
    const user_id = req.params.user_id;
    const friend_id = req.params.friend_id;
    const checkQ = 'SELECT * FROM relations WHERE user_id=? AND friend_id=?';
  
    // console.log(user_id)
    // friend_id.map((value,index)=>(
    //   console.log(value)
    // ))
  
    
    db.query(checkQ, [user_id, friend_id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      if (data.length > 0) {
        res.status(200).json('friends');
      } else {
        const deleteMessages = 'DELETE FROM convertation WHERE sender_id=? OR sender_id=?' 
        db.query(deleteMessages,[user_id,friend_id],(err,result)=>{
          if (err) return res.status(500).json(err);
          if(result){
            res.status(200).json('not_friends');
          }else{
            res.status(204).json('cant do it')
          }
        })
        
      }
    });
  };



const AddFriend = (req,res)=>{
    //adding a new frind 
const addFriendQ = 'INSERT INTO relations(user_id,friend_id) VALUES(?,?),(?,?)'
const user_id = req.body.user
const friend_id = req.body.data.user_id
const checkQ = 'SELECT * FROM relations WHERE user_id=? AND friend_id=?'


db.query(checkQ,[user_id,friend_id],(err,data)=>{
if(err) return res.status(500).json(err)
if(data.length > 0){
const DelQ = 'DELETE FROM relations WHERE (user_id=? AND friend_id=?) OR (user_id=? AND friend_id=?)'
db.query(DelQ,[user_id,friend_id,friend_id,user_id],(err,result)=>{
    if(err) return res.status(500).json(err)
    if(result) return res.status(200).json('Unfriended')
    return res.status(401).json('cant add this user please try again')
})

}
else{

db.query(addFriendQ,[user_id,friend_id,friend_id,user_id],(err,result)=>{
    if(err) return res.status(500).json(err)
    if(result) return res.status(200).json('friend')
    return res.status(401).json('cant add this user please try again')
})
}

}
)
 



}


const GetContacts = (req,res)=>{
//geting all friends of the user
const GetFriQ = 'SELECT u.* FROM users AS u JOIN relations AS r ON u.user_id = r.friend_id WHERE r.user_id=? AND r.friend_id!=?;'
const friendsIDS = []
const usersD = []
db.query(GetFriQ,[req.params.user_id,req.params.user_id],(err,data)=>{
    if(err) return res.status(500).json(err)
    if(data.length > 0){
        
        // console.log(data)
        res.status(200).json(data)  
       
      
        
    }else{
        res.status(200).json({message : 'no friends yet'}) 
    }
})
}


module.exports = {GetContacts,FrindsToSearch,AddFriend,checkFriendship}