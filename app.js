
const express = require('express');
const app = express()();
var ejs = require('ejs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/public'));
app.get("/", function(){

})
app.get("/login", function (req, res) {
  console.log("here I am")
  res.render(__dirname + '/views/index.ejs', {});
});

function onConnection(socket) {
  socket.on('drawing', function (data) {
    socket.broadcast.emit('drawing', data);
    console.log(data);
  });

  socket.on('rectangle', function (data) {
    socket.broadcast.emit('rectangle', data);
    console.log(data);
  });

  socket.on('linedraw', function (data) {
    socket.broadcast.emit('linedraw', data);
    console.log(data);
  });

  socket.on('circledraw', function (data) {
    socket.broadcast.emit('circledraw', data);
    console.log(data);
  });

  socket.on('ellipsedraw', function (data) {
    socket.broadcast.emit('ellipsedraw', data);
    console.log(data);
  });

  socket.on('textdraw', function (data) {
    socket.broadcast.emit('textdraw', data);
    console.log(data);
  });

  socket.on('copyCanvas', function (data) {
    socket.broadcast.emit('copyCanvas', data);
    console.log(data);
  });

  socket.on('Clearboard', function (data) {
    socket.broadcast.emit('Clearboard', data);
    console.log(data);
  });

}

io.on('connection', onConnection);

http.listen(port, () => {
  // connect to DB
  console.log('listening on port ' + port)
});
