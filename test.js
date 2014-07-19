var request = require('request');
var _ = require('underscore');
var q = require('q');
var URLManager = require('./libmb/URLManager'); 
var Response = require('./libmb/Response'); 
var Request = require('./libmb/Request'); 
var CookieMessages= require('./libmb/CookieMessages'); 
var CookieManager = require('./libmb/CookieManager'); 
var PageParser =  require('./libmb/PageParser'); 
var Trooper =  require('./libmb/Trooper'); 
var cheerio = require('cheerio'); 

var fs = require('fs');


var writeToFile = function(b){
fs.writeFile("./examle.txt", b, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
};


var trooperConfig = require('./config');

var trooper = new Trooper(trooperConfig);


var parser = new PageParser();
var promise = trooper.auth();
promise.then(function(result){
console.log("auth:", result.code, result.message);
var promise = trooper.getArmyList();
promise.then(function(armyList){
	console.log(armyList);
})
// var promise = trooper.req.get(trooper.urlManager.getTrooperArmyPageList());
// promise.then(function(body){   
// var list = parser.getTrooperArmyList(body);
// console.log(list);


// _.each(list, function(trooperId){

// var url = 'http://ziemniaki.minitroopers.com/details?t='+trooperId;
// var promise = trooper.req.get(url);
// promise.then(function(body){
// var detalis = parser.getTrooperDetalis(body);
// console.log(detalis);
// });

// });


// });

// var url = 'http://ziemniaki.minitroopers.com/details?t=1210152';
// var promise = trooper.req.get(url);
// promise.then(function(body){
// var detalis = parser.getTrooperDetalis(body);
// console.log(detalis);
// });
 


//TROOPERS PAGE INFO
// var promise = trooper.req.get(trooper.urlManager.getTrooperUrl(0));
// promise.then(function(body){ 
// 	var availableSkills = parser.getTrooperUpgradeInfo(body);
// 	console.log(availableSkills);
 

// });
// var promise = trooper.req.get(trooper.urlManager.getTrooperUrl(1));
// promise.then(function(body){ 
// 	var trooperInfo = parser.getTrooperInfo(body);
// 	console.log(trooperInfo);
// });

//UPGRADE:
// var promise = trooper.upgrade(1);
// promise.then(function(result){
// 	console.log(result,  CookieMessages.upgrade[result]);
// });


//FIGHT:
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

});