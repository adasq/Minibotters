var request = require('request'),
_ = require('underscore'),
nodemailer = require('nodemailer'),
q = require('q'),
config = require('./app/config'),
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
MongoStore = require('connect-mongo')(express);
routesGET = require('./app/routes/get'),
routesPOST = require('./app/routes/post'),
uuid= require('node-uuid'),
crypto= require('crypto'),
Utils= require('./app/models/Utils'),
User= require('./app/models/User'),
MailManager= require('./app/models/MailManager'),
i18n = require("i18n"),
  bodyParser = require('body-parser'),
db = require('./app/db/connect');
 



// var mailOptions = {
//     from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
//     to: 'asnaebaem@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ✔', // plaintext body
//     html: '<b>Hello world ✔</b>' // html body
// };


// var promise =  MailManager.send(mailOptions);
// promise.then(function(){
//     console.log("sent!");
// }, function(resposne){
//     console.log("ERR", resposne);
// });

// var adam = new User({name: "adam3", pass: "wsff"});
// var promise = adam.save();
// promise.then(function(result){
//   console.log("success", result);
// }, function(){
//   console.log("err");
// });

 
// db.User.findOne({name: "yebieoll"}, function(err, model){ 
//      db.User.update( { _id: model._id}, { $set: { "trooperLists.0" : {troopers: [{name: "xd2", pass:"xd2"}] }} }, function(err, model){
//       console.log(err, model)
//      } )
// });



// db.User.findOne({name: "yebieoll"}, function(err, model){ 
//      db.User.update( { _id: model._id}, { $set: { "trooperLists.0" : {troopers: [{name: "xd2", pass:"xd2"}] }} }, function(err, model){
//       console.log(err, model)
//      } )
// });





// db.User.findOne({name: "yebieoll"}, function(err, model){ 
//      db.User.update( { _id: model._id}, { $set: { "trooperLists.0.troopers" : [{name: "xd112", pass:"xd112"}] } }, function(err, model){
//       console.log(err, model)
//      } )
// });


// promise.then(function(adam){
//     if(adam){      

//     }else{
//       console.log("no exists")
//     }
// }, function(){
//   console.log("err db");
// });
// db.Trooper.findById("53edc66395cec91c02b88401", function(err, model){
//   console.log(err, model)
//  });



i18n.configure({
    locales: config.i18n.locales,
    defaultLocale: config.i18n.defaultLocale,
    cookie: config.i18n.cookieName,
    directory: __dirname + '/app/lang'
});


//CONFIG ===========================================
var app = express(); 
  app.use(express.cookieParser()); 
  app.use(i18n.init);
   app.use(bodyParser());

   app.use(express.session({
  store: new MongoStore({
    url: "mongodb://localhost/forum"
  }),
  secret: '1234567890QWERTY'
}));
  app.use(express.urlencoded()); 
  app.use('/', express.static(__dirname + '/webapp'));

   app.use(function(req, res, next){  
      if(req.session.user){
        next();
      }else{
         next();
      }
      
   });

//ROUTES ===========================================
 
_.each(routesGET, function(route){
  app.get('/api'+route.url, route.callback);
});
_.each(routesPOST, function(route){
  app.post(route.url, route.callback);
});


app.listen(config.PORT);


app.get('/test', function(req, res){ 
  res.cookie(config.i18n.cookieName, 'pl_PL');
console.log(res.__('hello')); 

console.log(req.headers)

var trooperConfig = {
  domain: "com",
  opponent: "nopls",
  name: "ziemniaki3"
};

var trooper = new Trooper(trooperConfig);
  
	trooper.auth().then(function(result){
		console.log("[AUTH]", result.code, result.message);

		trooper.getArmyList().then(function(armyList){		 
			res.send(armyList);
		});
	});  
});

//===========================================
var trooperConfig = {
  domain: "com",
  opponent: "nopls",
  name: "ziemniaki2",
//pass: "nowehaslo"
};
var trooper = new Trooper(trooperConfig);

 

var generateArmyList = function(trooperConfig){
  var armyPromise = q.defer();
  var currentTrooper = new Trooper(trooperConfig); 
  var promise = currentTrooper.auth();
  promise.then(function(){        
        var promise = currentTrooper.getArmyList();
        promise.then(armyPromise.resolve, armyPromise.reject);  
  }, armyPromise.reject); 
  return armyPromise.promise;
};
var test = {name: trooperConfig.name, children: []};
 var list = 0;
 var troopersFamily = {};
 var finish = function(){
  console.log(JSON.stringify(test));
 };
var generate = function(trooperConfig, test){
  ++list;
  var p = generateArmyList(trooperConfig);  
  p.then(function(armyList){ 
     --list;
 if(list === 0){
  finish();
 }
        _.each(armyList, function(army){
          var armyObject = {name: army.name, children: [] };      
          if(troopersFamily[trooperConfig.name]){
            troopersFamily[trooperConfig.name].push(army.name);
          }else{
            troopersFamily[trooperConfig.name]= [army.name];
          }
          test.children.push(armyObject);
          // console.log(army.name +" child of "+trooperConfig.name);          
          generate({name: army.name, domain: "com",  opponent: "nopls"}, armyObject);
        });        
        
  }, function(){
    --list; 
     if(list === 0){
  finish();
 }
  });  

};


generate(trooperConfig, test);


// setInterval(function(){
//   console.log(list)
//   if(list === 0){
//     console.log(troopersFamily);
//     return;
//   }
// }, 200)


// function step1() {
//     var deferred = q.defer();
//     deferred.resolve("test");
//     return deferred.promise;
// }

// function step2(step1Value) {
//     var deferred = q.defer();
//     deferred.resolve(step1Value+ "test");
//     return deferred.promise;
// }

// function report(step2Value) {
//     console.log(step2Value);
//     // implicitly returns undefined, albeit a promise for undefined
// }

// q.fcall(step1)
// .then(step2)
// .then(report)
// .done();












// .then(function(a){
// }); 

// var promise = trooper.auth();
// promise.then(function(result){
// console.log("[AUTH]", result.code, result.message);
//  //============================  YOUR ARMY ======================

// var promise = trooper.getArmyList();
// promise.then(function(armyList){
//   _.each(armyList, function(army){     
//        var trooperX = new Trooper({name: army.name,  domain: "com", opponent: "nopls"});
//        var promise = trooperX.auth();
//        promise.then(function(){
//            var promise = trooperX.getArmyList();
//            promise.then(function(army2){
//               console.log(army2);
//            });
//        })
      
       
//   });



// }); 

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



//===============================================================
//});