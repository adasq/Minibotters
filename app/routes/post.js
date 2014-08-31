var db = require('../db/connect'),
User= require('../models/User'),
Response= require('../models/Response'),
Trooper =  require('../../libmb/Trooper'),
Enums= require('../models/Enums');


var SuccessResponse = Response.success;
var ErrorResponse = Response.error;

var routes = [];
//========================================================================================
routes.push({
	url: "/register",
	callback: function(req, res){
  var post_data = req.body;
  var name = post_data.name;
  var mail = post_data.mail;
  var pass = post_data.pass;

      var newUser = new User({name: name, pass: pass, mail: mail});
      var promise = newUser.save();
      promise.then(function(){
        res.send({error: false, response: {}});
      }, function(response){
        var msg = "Błąd pdoczas rejestracji";        
        if(response.errors.name){     
           msg= "Użytkownik już istnieje";                 
        }else if(response.errors.mail){
            msg= "Adres mail jest już zajęty";
        }else{};
        res.send({error: true, reason: {msg: msg}});       
      });
		}
});
//========================================================================================
routes.push({
  url: "/createList",
  callback: function(req, res){
      var post_data = req.body;
      var newListData = {
        _creator: req.session.user.data._id,
        name: post_data.name,
        troopers: post_data.troopers
      };
    db.TrooperList(newListData).save(function(err, model){
       if(err){
   res.send(ErrorResponse('creating failed!'));
  }else{
   res.send(SuccessResponse({}));
  }
      
    });
    }
});
//========================================================================================
routes.push({
  url: "/updateList",
  callback: function(req, res){
      var post_data = req.body;

      var listData = {
        _id: post_data._id,
        _creator: post_data._creator,
        name: post_data.name,
        troopers: post_data.troopers
      };

db.TrooperList.update({_id: listData._id, _creator: req.session.user.data._id}, {
          name: post_data.name,
        troopers: post_data.troopers
}, function(err, numberAffected, rawResponse) {
  
  if(err){
   res.send(ErrorResponse('updating failed!'));
  }else{
   res.send(SuccessResponse({}));
  }
});


    }
});
//========================================================================================
routes.push({
  url: "/getList",
  callback: function(req, res){
      var post_data = req.body;
      var listData = {       
        name: post_data.name,
        _creator: req.session.user.data._id
      };
    db.TrooperList.findOne(listData, function(err, model){
      if(!err && model){
        res.send(SuccessResponse(model));
      }else{
         res.send(ErrorResponse("problem? :D"));
      }      
    });
    }
});
//========================================================================================
routes.push({
  url: "/getLists",
  callback: function(req, res){
      var listData = {          
        _creator: req.session.user.data._id
      };
    db.TrooperList.find(listData, function(err, model){
      if(!err && model){
        res.send(SuccessResponse(model));
      }else{
         res.send(ErrorResponse("problem? :D"));
      }      
    });
    }
});
//========================================================================================
routes.push({
  url: "/login",
  callback: function(req, res){
      var post_data = req.body;
      var name = post_data.name;
      var pass = post_data.pass;

var promise = User.getUserByName(name);
promise.then(function(user){
    if(!user){
      res.send({error: true, reason: {msg: "User does not exists"}});     
    }else{    
      var isPassCorrect = (user.isPasswordCorrect(pass));
      var isActive = (user.data.state !== Enums.User.State.INACTIVE);
      if(isPassCorrect && isActive){

            req.session.user = user;
           
             res.send({error: false, response: {user: user}});    

      }else{
        res.send({error: true, reason: {msg: "pass or state not suitable"}});     
      }      
           
    }
}, function(){
  console.log("err db");
});
    }
});
//========================================================================================
routes.push({
  url: "/getUser",
  callback: function(req, res){
if(req.session.user){
  res.send({error: false, response: {user: req.session.user}});  
}else{
  res.send({error: true, reason: {msg: "not logged in"}});  
}  
}
});


routes.push({
  url: "/logout",
  callback: function(req, res){
        req.session.user = undefined;
        res.send({error: false, response: {user: req.session.user}});  
    
}
});
//========================================================================================
routes.push({
  url: "/generateList",
  callback: function(req, res){

   
      var post_data = req.body;

var name = post_data.name;
var pass = post_data.pass;
var trooperConfig = {
  domain: "com",
  opponent: "nopls",
  name: name,
  pass: pass || undefined
};
var trooper = new Trooper(trooperConfig);
var promise = trooper.auth();
promise.then(function(result){
console.log("[AUTH]", result.code, result.message);
  var promise = trooper.getArmyList();
promise.then(function(armyList){
  res.send({error: false, response: {armyList: armyList}});
}); 
});  
}
});
//========================================================================================

module.exports = routes;