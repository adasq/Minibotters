
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

//------------------------------------------
var User = new Schema({
   name     : {type: String, required: true}, 
   pass     : {type: String, required: true},
   apitoken : {type: String, required: true},    
   state	: {type: Number, default: 0},
   deleted 	: {type: Boolean, default: false},
   regDate	: {type: Date, default: new Date()},
   sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
});

mongoose.model('User', User);
exports.User = function(db) {
  return db.model('User');
};
//------------------------------------------
var Session = new Schema({ 
   userAgent     : {type: String, required: true}, 
   accessToken     : {type: String, required: true},
   expired   : {type: Boolean, default: false},
   initDate  : {type: Date, default: new Date()}
});

mongoose.model('Session', Session);
exports.Session = function(db) {
  return db.model('Session');
};
//------------------------------------------

