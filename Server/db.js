const mydb = require('mysql')

const db = mydb.createConnection({
    host : 'bdxz50worrjjy0e2avmg-mysql.services.clever-cloud.com',
    user : 'uotq5pgtcbyfduqx',
    password : '1uJxwZKMSs26wfD383ZS',
    database : 'bdxz50worrjjy0e2avmg' 
})
 

module.exports = db
