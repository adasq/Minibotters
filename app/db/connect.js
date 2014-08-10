
var config = require('./config'),
model = require('./model'),
mongoose = require('mongoose');

db = mongoose.connect(config.connectionURI);

module.exports =  {
	Message: model.Message(db),
};