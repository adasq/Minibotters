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
fs = require('fs');

var parser = new PageParser();

var writeToFile = function(b){
fs.writeFile("./debug.txt", b, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("[DEBUG FILE UPDATED]");
    }
}); 
};




var app = express();
app.listen(80);



app.get('/test', function(req, res){  
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