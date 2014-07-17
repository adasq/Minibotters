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


var fs = require('fs');


var writeToFile = function(b){
fs.writeFile("./test.html", b, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
};

var trooper = new Trooper({
	domain: "com",
	name: "qqqqqqqq",
	opponent: "niekoxaj"
//	name: "exampletrooper",
//	pass: "examplePassword" 
});
var parser = new PageParser();
var promise = trooper.auth();
promise.then(function(result){

console.log("auth:", result.code, result.message);

//TROOPERS PAGE INFO
var promise = trooper.req.get(trooper.urlManager.getTrooperUrl(0));
promise.then(function(body){ 
	var availableSkills = parser.getTrooperUpgradeInfo(body);
	console.log(availableSkills);
 

});

var promise = trooper.req.get(trooper.urlManager.getTrooperUrl(1));
promise.then(function(body){ 
	var trooperInfo = parser.getTrooperInfo(body);
	console.log(trooperInfo);
});

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