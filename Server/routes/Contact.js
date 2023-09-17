const express = require('express')
const router = express.Router()
const { GetContacts,FrindsToSearch,AddFriend,checkFriendship } = require('../controllers/ContactController.js')

router.post('/friendf',FrindsToSearch)
router.put('/addfriend',AddFriend)
router.get('/contacts/:user_id',GetContacts)
router.get('/checkFriendship/:user_id/:friend_id',checkFriendship) 

 
module.exports = router
  