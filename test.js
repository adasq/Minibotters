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


var trooper = new Trooper({
	domain: "com",
	name: "ziemniaki7",
	opponent: "niekoxaj"
//	name: "exampletrooper",
//	pass: "examplePassword" 
});

var promise = trooper.auth();
promise.then(function(result){	
console.log(result.code, result.message);


	// var promise= trooper.makeMissions();
 // 	promise.then(function(resp){
	//   console.log("makeMissions ",resp);	  
	// });



// var promise= trooper.makeBattles();
//  	promise.then(function(resp){
// 	  console.log("makeBattles", resp);	  
// 	});


var promise= trooper.makeRaids();
 	promise.then(function(resp){
	  console.log("makeRaids", resp);	  
	});

 });