// const db = require('../db')

const express = require('express')
const route = express.Router()
const { sendMessage , getMessages} = require('../controllers/MessagesCont')


route.put('/sendmessage',sendMessage)
route.get('/getmessages/:user1_id/:user2_id',getMessages)




module.exports = route