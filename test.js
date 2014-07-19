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



var trooperConfig = require('./config');
var trooper = new Trooper(trooperConfig);


try{
trooper.getArmyList();

}catch(exception){
	console.log(exception);
}



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

// var promise = trooper.upgrade(1);
// promise.then(function(result){
// 	console.log(result,  CookieMessages.upgrade[result]);
// });

//============================  YOUR ARMY ======================

var promise = trooper.getArmyList();
promise.then(function(armyList){
	console.log(armyList);
});





//===============================================================
});