const express = require('express')
const { RegisterContr,LoginContr,LogoutContr } = require('../controllers/auth')
const route = express.Router()


route.post('/register',RegisterContr)
route.post('/login',LoginContr)
route.get('/logout',LogoutContr)

module.exports = route