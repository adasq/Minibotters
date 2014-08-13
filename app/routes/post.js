var db = require('../db/connect');
var User= require('../models/User');
var Enums= require('../models/Enums');


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
     



      // if(user.isPasswordCorrect(pass)){
      //     res.send({error: false, message: "pswd ok"});
      // }else{
      //     res.send({error: true, message: "pswd :("});
      // }

      
    }
}, function(){
  console.log("err db");
});
    }
});




module.exports = routes;