const stream = (socket)=>{
    socket.on('subscribe', (data)=>{
        // console.log('data: ', data);
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);
        // console.log('data.room : ',data.room);
        // console.log('data.socketId : ',data.socketId);
        // console.log('socekt.rooms : ', socket.rooms);
        
        // console.log('in the stream function');
        //Inform other members in the room of new user's arrival
        if(socket.adapter.rooms[data.room].length > 1){
            socket.to(data.room).emit('new user', {socketId:data.socketId});
        }

        // console.log(socket.rooms);
    });


    socket.on('newUserStart', (data)=>{
        socket.to(data.to).emit('newUserStart', {sender:data.sender});
    });


    socket.on('sdp', (data)=>{
        socket.to(data.to).emit('sdp', {description: data.description, sender:data.sender});
    });


    socket.on('ice candidates', (data)=>{
        socket.to(data.to).emit('ice candidates', {candidate:data.candidate, sender:data.sender});
    });


    socket.on('chat', (data)=>{
        socket.to(data.room).emit('chat', {sender: data.sender, msg: data.msg});
    });
}

module.exports = stream;