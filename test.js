var request = require('request');
var _ = require('underscore');
var q = require('q');


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
};

 
	var CookieMessages= {
		"-1": "No cookies set",
		"87": "You lose the mission",
		"100": "You do not made a mission",
		"176": "win mission"
	};
 




var MinibottersCookieManager = {
	getCHKByCookie: function(cookie){
		return cookie.substr(47, 6);
	},
	getMessageByCookie: function(cookie){
var matcher = cookie.match(/:msgy\d+:/);
var num = matcher[0].substr(5).slice(0,-1);
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
}

var Request = function(){
	var j= request.jar();
	this.send = function(url){
			var defer= q.defer(); 			
request({uri: url, jar: j, followRedirect: false}, function(e,r,b){
	var response = new Response(r);
	defer.resolve(response);
});
			return defer.promise;
	}
};

var Trooper = function(config){
	this.urlManager = new TrooperURLManager(config);
	var that= this, req = new Request();
	this.config = _.extend({}, config);
	this.chk;
	this.auth= function(){
			var defer= q.defer(); 	 
var promise= req.send(that.urlManager.getBaseUrl());
promise.then(function(response){
var cookie = response.getCookies();
that.chk = MinibottersCookieManager.getCHKByCookie(cookie);
 defer.resolve();
	});
return defer.promise;
	};


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
			console.log("~~");
		});
		return defer.promise;
	};
	this.makeMissions = function(){
		var promise= q.all([
		ziemniakiTrooper.makeMission(),
		ziemniakiTrooper.makeMission(),
		ziemniakiTrooper.makeMission()
		]);
		return promise;
	};
};

Trooper.prototype.toString= function(){
	return "chk: "+this.chk;
};

var ziemniakiTrooper = new Trooper({
	domain: "com",
	name: "ziemniaki12"
});

var promise = ziemniakiTrooper.auth();
promise.then(function(){
	var promise= ziemniakiTrooper.makeMissions();
 	promise.then(function(resp){
	  console.log("makeMissions ",resp);	  
	});
});