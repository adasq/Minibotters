var request = require('request');
var _ = require('underscore');
var q = require('q');
var cheerio = require('cheerio'); 





var PageParser = function(){

this.getTrooperInfo = function(b){
var $ = cheerio.load(b, {normalizeWhitespace: true});

var money = $('.money').text().trim();
var needToUpgrade = $("a[class='but_bg b3_bg img']").text().trim()

var items = $('li.on');
var skills = [];
_.each(items, function(val, name){
	var diva = items[name].attribs.onmouseover;
	diva= diva.substr(21, diva.length-21-2).replace(/\\\'/g, "'");
	$ = cheerio.load(diva);
	var title = ( $('.tipcontent h1').text().trim()); 
	var desc = ( $('.s').text().trim()); 
	skills.push({
		title: title,
		desc: desc
	});
});
var needToUpgrade = needToUpgrade.split(" ");
needToUpgrade = needToUpgrade[needToUpgrade.length-1];
return {
	skills: skills,
	money: +money,
	needToUpgrade: +needToUpgrade
};

};

}






var TrooperURLManager = function(config){	
	var domain = config.domain;
	var name = config.name;
	var baseUrl = "http://"+name+".minitroopers."+domain+"/";
	this.getBaseUrl= function(){
		return baseUrl+"hq";
	};
	this.getMissionUrl= function(chk){
		return baseUrl+"b/mission?chk="+chk;
	};
	this.getMainTrooperUrl= function(){
		return baseUrl+"t/0";
	};
	this.getLoginUrl = function(){
		return baseUrl+"login";
	}
}; 
	var CookieMessages= {
		"-1": "No cookies set",
		"87": "You lose the mission",
		"100": "You do not made a mission",
		"176": "win mission",
		auth: {
			"46": "You need to authorize",
			"21": "Wrong Password",
			"501": "Trooper does not exists",
			"201": "Successfully authorized"
		}
	};
var MinibottersCookieManager = {
	getCHKByCookie: function(cookie){
		return cookie.substr(47, 6);
	},
	getMessageByCookie: function(cookie){
		var matcher = cookie.match(/:msgy\d+:/);
		var num = matcher[0].substr(5).slice(0,-1);
		return +num;
	},
	getTextByCookie: function(cookie){
		var matcher = cookie.match(/:texty\d+:/);
		if(!matcher){
			return null;
		}
		var num = matcher[0].substr(6).slice(0,-1);
		return +num;
	}
};
var Response = function(obj){
	this.isRedirect = function(){
		return obj.statusCode === 302;
	};
	this.getHeaders = function(){
		return obj.headers;
	};
	this.getCookies = function(){
		var headers = this.getHeaders();
		if(headers['set-cookie']){
			return headers['set-cookie'][0];
		}else{
			return null;
		}		
	}
};
var Request = function(){
	var j= request.jar();
	this.send = function(url){
			var defer= q.defer(); 			
			request({uri: url, jar: j, followRedirect: false}, function(e,r,b){
				var response = new Response(r);
				defer.resolve(response);
			});
			return defer.promise;
	};
	this.post = function(url, data){
			var defer= q.defer(); 			
			request.post({form: data, uri: url, jar: j, followRedirect: false}, function(e,r,b){		 
				var response = new Response(r);
				defer.resolve(response);
			});
			return defer.promise;
	};
};
var Trooper = function(config){
	this.urlManager = new TrooperURLManager(config);
	var promise, that= this, req = new Request();
	this.config = _.extend({}, config);
	this.chk;
//================================================	
	this.auth= function(){
var defer= q.defer();
if(that.config.pass){
	var data = {
		login: that.config.name,
		pass: that.config.pass
	};
	promise= req.post(that.urlManager.getLoginUrl(), data);
}else{	
	promise= req.send(that.urlManager.getMainTrooperUrl());
}

promise.then(function(response){
var cookie = response.getCookies();
 //console.log(response.getHeaders());
var code = null;
if(response.isRedirect()){
  	code= MinibottersCookieManager.getTextByCookie(cookie);
  	if(that.config.pass){
 		code= code || 201;
  	}else{
  		code= code || 501;
  	}	
}else{
 	that.chk = MinibottersCookieManager.getCHKByCookie(cookie);
 	code= 201;
}
 defer.resolve({code: code, message: CookieMessages.auth[code]});
});
return defer.promise;
	};
//=============================================

	this.makeMission = function(){
		var defer= q.defer(); 	
		var promise= req.send(that.urlManager.getMissionUrl(that.chk));
		promise.then(function(response){		
			var cookies= response.getCookies();
			if(cookies){
				var msg = MinibottersCookieManager.getMessageByCookie(cookies);
				defer.resolve(msg);
			}else{
				defer.resolve(-1);
			}
		}, function(){ 
			console.log("not catched err")
		});
		return defer.promise;
	};
	this.makeMissions = function(){
		var promise= q.all([
		this.makeMission(),
		this.makeMission(),
		this.makeMission()
		]);
		return promise;
	};
};

Trooper.prototype.toString= function(){
	return "chk: "+this.chk;
};

var trooper = new Trooper({
	domain: "com",
	name: "ziemniaki4"
//	name: "exampletrooper",
//	pass: "examplePassword" 
});

request({uri: "http://ziemniaki3.minitroopers.com/t/0", followRedirect: true}, 
	function(e,r,body){

var parser = new PageParser();
 console.log(parser.getTrooperInfo(body))

});

 


// var promise = trooper.auth();
// promise.then(function(result){
// console.log(result.code, result.message);

// 	var promise= trooper.makeMissions();
//  	promise.then(function(resp){
// 	  console.log("makeMissions ",resp);	  
// 	});
//  });