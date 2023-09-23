const io = require('socket.io')(process.env.PORT || 8900, {
    cors: {
                origin: 'http://127.0.0.1/:8900',
        credentials: true,
    },
});

let users = [];

const addUser = (user_id, socket_id) => {
    !users.some((u) => u.user_id === user_id) && users.push({ user_id, socket_id });
};

const removeUser = (socket_id) => {
    users = users.filter((u) => u.socket_id !== socket_id);
};

const getUser = (user_id) => {
    return users.find((u) => u.user_id == user_id);
};

io.on('connection', (socket) => {

    socket.on('addUser', (user_id) => {
        addUser(user_id, socket.id);
        io.emit('getUsers', users);
        
    });

    

    socket.on('userTyping',({typer,receiver_id})=>{
        
        
        socket.broadcast.emit("userTyping",{typer})
    })

    socket.on('userStopTyping',()=>{
        socket.broadcast.emit('userStopTyping')
    })

    // send message
    socket.on('sendMessage', ({ sender_id, receiver_id, message }) => {
        const user = getUser(receiver_id);
    
        io.to(user.socket_id).emit('receiveMessage', { 
            sender_id,
            message,
        });
    
    });

    socket.on('onlineStats',(data)=>{
        console.log(data)
    })

    socket.on('disconnect', () => {
        removeUser(socket.id);
    });
});

module.exports = io;



