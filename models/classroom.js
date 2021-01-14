var mongoose = require('mongoose')
var db = require('../db').db

var classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required:true },
  classId: { type: String, required: true },
  isTeacher: {type: Boolean, default: false}
}, { timestamps: true })


var Classroom = db.model('Classroom', classroomSchema)

module.exports = { Classroom }
