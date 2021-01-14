
const express = require('express');
const app = express();
var ejs = require('ejs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { db, onConnect } = require('./db');
const { Classroom } = require('./models/classroom');
const bodyParser = require('body-parser')
var session = require('express-session')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

const sessionInstance = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})
app.use(sessionInstance)

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  if (req.session.classroom) return res.render(__dirname + '/views/whiteboard.ejs', { classroom: req.session.classroom });
  return res.render(__dirname + '/views/index.ejs', {});
});


app.post("/", async function (req, res) {
  // check if class already exist.. 
  // if role == teacher  the must be email == email
  // !techer join as then board
  var { name, email, classId, isTeacher } = req.body
  let existingClass = await Classroom.findOne({ classId })
  if (existingClass) {
    existingClass.isTeacher = false
    if (email == existingClass.email) {
      existingClass.isTeacher = true
    }
    else if (isTeacher) {
      return res.render(__dirname + '/views/index.ejs', { error: "This Class does not belong to you" });
    }
  }
  else {
    existingClass = new Classroom({ name, email, classId })
    existingClass = await existingClass.save()
    existingClass.isTeacher = true

  }
  req.session.classroom = existingClass;
  res.render(__dirname + '/views/whiteboard.ejs', { classroom: existingClass });
});

app.get("/logout", function (req, res) {
  req.session.classroom = null;
  return res.redirect("/")
});

function onConnection(socket) {
  // console.log(socket.request.session.classroom._id)
  const isClass = socket.request.session && socket.request.session.classroom
  const classId = isClass && socket.request.session.classroom._id
  const isTeacher = isClass && socket.request.session.classroom.isTeacher
  const email = isClass && socket.request.session.classroom.email
  if (!classId) {
    socket.in(classId).emit('logout');
    return
  }
  if (isTeacher) {
    socket.join(email)
  }

  socket.join(classId)
  socket.on('drawing', function (data) {
    socket.in(classId).emit('drawing', data);
    console.log(data);
  });

  socket.on('rectangle', function (data) {
    socket.in(classId).emit('rectangle', data);
    console.log(data);
  });

  socket.on('linedraw', function (data) {
    socket.in(classId).emit('linedraw', data);
    console.log(data);
  });

  socket.on('circledraw', function (data) {
    socket.in(classId).emit('circledraw', data);
    console.log(data);
  });

  socket.on('ellipsedraw', function (data) {
    socket.in(classId).emit('ellipsedraw', data);
    console.log(data);
  });

  socket.on('textdraw', function (data) {
    socket.in(classId).emit('textdraw', data);
    console.log(data);
  });

  socket.on('copyCanvas', function (data) {
    socket.in(classId).emit('copyCanvas', data);
    console.log(data);
  });

  socket.on('Clearboard', function (data) {
    socket.in(classId).emit('Clearboard', data);
    console.log(data);
  });

  socket.on('Disableboard', function (data) {
    socket.in(classId).emit('DisableboardAction', data);
    console.log(data);
  });
}
io.use(function (socket, next) {
  sessionInstance(socket.request, socket.request.res, next);
});
io.on('connection', onConnection);

http.listen(port, () => {
  onConnect()
  console.log('listening on port ' + port)
});
