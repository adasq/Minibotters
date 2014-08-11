var request = require('request'),
_ = require('underscore'),
q = require('q'),
URLManager = require('./libmb/URLManager'), 
Response = require('./libmb/Response'), 
Request = require('./libmb/Request'), 
CookieMessages= require('./libmb/CookieMessages'), 
CookieManager = require('./libmb/CookieManager'), 
PageParser =  require('./libmb/PageParser'), 
Trooper =  require('./libmb/Trooper'), 
cheerio = require('cheerio'), 
express = require('express'),
fs = require('fs'),
mongoose = require('mongoose'),
routesGET = require('./app/routes/get'),
routesPOST = require('./app/routes/post'),
uuid= require('node-uuid'),
Utils= require('./app/models/Utils'),
User= require('./app/models/User'),
i18n = require("i18n"),
db = require('./app/db/connect');

i18n.configure({
    locales:['en', "pl_PL"],
    defaultLocale: 'en',
     cookie: 'yourcookiename',
    directory: __dirname + '/app/lang'
});

var parser = new PageParser();

// var writeToFile = function(b){
// fs.writeFile("./debug.txt", b, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("[DEBUG FILE UPDATED]");
//     }
// }); 
// };

// var adam = new User("adam", "wsff");
// var promise = adam.save();
// promise.then(function(result){
//   console.log("success", result);
// }, function(){
//   console.log("err");
// });

// var promise = User.getUserByName("adam2");
// promise.then(function(adam){
//     if(adam){

//     }
// }, function(){
//   console.log("err db");
// });
var promise = User.getUserById("53e7c5bc3041d9c8120b2943");
promise.then(function(adam){
    if(adam){
      console.log(adam);
      adam.data.pass = "zzzzzzzzz";
      adam.save().then(function(){
        console.log(adam)
      })

    }else{
      console.log("no exists")
    }
}, function(){
  console.log("err db");
});



var app = express(); 
  // you will need to use cookieParser to expose cookies to req.cookies
  app.use(express.cookieParser()); 
  // i18n init parses req for language headers, cookies, etc.
  app.use(i18n.init);
 


app.listen(80);

 


app.use(function(req, res, next) {
  //session handling here...
  next();
});

_.each(routesGET, function(route){
  app.get(route.url, route.callback);
});
_.each(routesPOST, function(route){
  app.post(route.url, route.callback);
});






app.get('/test', function(req, res){ 
  res.cookie('yourcookiename', 'pl_PL');
console.log(res.__('hello')); 



var trooperConfig = require('./config');
var trooper = new Trooper(trooperConfig);

	trooper.auth().then(function(result){
		console.log("[AUTH]", result.code, result.message);

		trooper.getArmyList().then(function(armyList){		 
			res.send(armyList);
		});
	});  
});

//===========================================
var trooperConfig = require('./config');
var trooper = new Trooper(trooperConfig);


// try{
// 	trooper.getArmyList();
// }catch(exception){
// 	console.log(exception);
// }


var promise = trooper.auth();
promise.then(function(result){
console.log("[AUTH]", result.code, result.message);
 
//============================ PARSE DATA ======================
//get trooper skills, money and amount needed to upgrade
// var promise = trooper.getTrooperSkillList(1);
// promise.then(function(skillList){ 
// 	console.log(skillList);
// });

//get trooper upgrade skills to select
// var promise = trooper.getTrooperUpgradeSkillList(0);
// promise.then(function(skillList){ 
// 	console.log(skillList);
// });

//============================ FIGHT ======================

// 	var promise= trooper.makeMissions();
//  	promise.then(function(resp){
// 	  console.log("makeMissions ",resp);	  
// 	});

// var promise= trooper.makeBattles();
//  	promise.then(function(resp){
// 	  console.log("makeBattles", resp);	  
// 	});

// var promise= trooper.makeRaids();
//  	promise.then(function(resp){
// 	  console.log("makeRaids", resp);	  
// });

//============================ UPGRADE ======================

//upgrade specific trooper
// var promise = trooper.upgrade(1);
// promise.then(function(result){
// 	console.log(result,  CookieMessages.upgrade[result]);
// });

//select upgraded skill selectSkill(trooper, skill)
// var promise = trooper.selectSkill(2, 101);
// promise.then(function(result){
//  console.log(result, CookieMessages.skillSelection[result]);
// });


//============================  YOUR ARMY ======================

var promise = trooper.getArmyList();
promise.then(function(armyList){
	console.log(armyList);
}); 

//===============================================================
});