let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let compression = require('compression')
const dotenv = require('dotenv')

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(compression());
// console.log('stream: ', stream);
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});



io.of('/stream').on('connection', stream);
const port = process.env.PORT;
server.listen(port, ()=>{
    console.log('Server Starts listening on port 3000');
});