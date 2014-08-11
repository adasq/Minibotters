var db = require('../db/connect'),
q = require('q');

var User = function(data){
	this.data = data;
};
 

User.getUserByField = function(field, value){
	var deferred = q.defer();
	var options = {};
	options[field]= value;
db.User.findOne(options, function (err, person) {
  	if(err){
			deferred.reject();
		}else{
			deferred.resolve(new User(person));
		}
});
return deferred.promise;	
};

User.getUserByName = function(name){
 	return User.getUserByField("name", name);
};

User.getUserById = function(id){
	return User.getUserByField("_id", id);
};

User.prototype.toString = function(argument) {
	return ";;";
};


User.prototype.save = function() {	
	var that=this, deferred = q.defer();
	if(this.data._id){
		//update
		this.data.save(function(err, model){
			if(err){
					deferred.reject();
			}else{
				that.data = model;
				deferred.resolve(model);
			}
		});
	}else{
		//create
		var user = new db.User(this.data);
		user.save(function(err, model){
		if(err){
			deferred.reject();
		}else{
			deferred.resolve(model);
		}
		});
	}
	
	return deferred.promise;	
};


 


module.exports = User;