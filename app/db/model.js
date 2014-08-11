
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Message = new Schema({
  author     : String, 
   text      : String
});

var User = new Schema({
   name     : {type: String, required: true}, 
   pass     : {type: String, required: true},    
   state	: {type: Number, default: 0},
   deleted 	: {type: Boolean, default: false},
   regDate	: {type: Date, default: new Date()}
});

mongoose.model('Message', Message);
exports.Message = function(db) {
  return db.model('Message');
};

mongoose.model('User', User);
exports.User = function(db) {
  return db.model('User');
};


