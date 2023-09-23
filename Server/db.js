const mydb = require('mysql')

const db = mydb.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'chatapp' 
})
 

module.exports = db