var express = require('express');
var path = require('path');
var cors = require('cors');
var ip = require('ip');
var api = require('./api');
var http = require('http');
var socketio = require('socket.io');

const port = 8080;

let app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

api(app, io);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'docs', 'index.html'));
})

server.listen(port, function() {
    console.log(`Server running on http://${ip.address()}:${port}/`);
    console.log(`or use http://localhost:${port}/`)
});
