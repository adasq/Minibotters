var db = require('../db/connect'),
User= require('../models/User'),
Trooper =  require('../../libmb/Trooper'),
Enums= require('../models/Enums');


var routes = [];

routes.push({
	url: "/reg",
	callback: function(req, res){
			var post_data = req.body;
var name = post_data.name;
var pass = post_data.pass;
var promise = User.getUserByName(name);
promise.then(function(user){
    if(!user){
    var newUser = new User({name: name, pass: pass});
    var promise = newUser.save();
    promise.then(function(){
      res.send({error: false, response: {apitoken: newUser.data.apitoken}});
    }, function(){
      res.send({error: true, message: "user not saved"});
    });
    }else{      
      res.send({error: true, message: "user exists"});
    }
}, function(){
   res.send({error: true, message: "err db"});
});
		}
});

routes.push({
  url: "/login",
  callback: function(req, res){
      var post_data = req.body;
var name = post_data.name;
var pass = post_data.pass;
var apitoken = post_data.apitoken;

var promise = User.getUserByName(name);
promise.then(function(user){
    if(!user){
      res.send({error: true, message: "user not exists"});
    }else{    
      var isPassCorrect = (user.isPasswordCorrect(pass));
      var isApiTokenCorrect = (user.data.apitoken === apitoken);
      var isActive = (user.data.state !== Enums.User.State.INACTIVE);
      if(isPassCorrect && isApiTokenCorrect && isActive){
            var session = user.getSessionByUserAgent(req.headers['user-agent']);
            console.log(session);
            if(!session){
                user.createSession(req.headers['user-agent']);
            }
      }else{
      }      
      res.send({error: false, response:{
        isActive: isActive,
        isPassCorrect: isPassCorrect,
        isApiTokenCorrect: isApiTokenCorrect
      }});      
    }
}, function(){
  console.log("err db");
});
    }
});


routes.push({
  url: "/generateList",
  callback: function(req, res){
      var post_data = req.body;
var name = post_data.name;
var pass = post_data.pass;
var trooperConfig = {
  domain: "com",
  opponent: "nopls",
  name: name
};
var trooper = new Trooper(trooperConfig);
var promise = trooper.auth();
promise.then(function(result){
console.log("[AUTH]", result.code, result.message);
  var promise = trooper.getArmyList();
promise.then(function(armyList){
  res.send({armyList: armyList});
}); 
});  
}     

});


module.exports = routes;