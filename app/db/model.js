
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Message = new Schema({
  author     : String, 
   text       : String
});

mongoose.model('Message', Message);


exports.Message = function(db) {
  return db.model('Message');
};


