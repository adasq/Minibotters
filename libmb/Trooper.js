var URLManager = require('./URLManager');  
var Request = require('./Request'); 
var CookieMessages= require('./CookieMessages'); 
var CookieManager = require('./CookieManager'); 
var _ = require('underscore');
var q = require('q');


var Trooper = function(config){
	this.urlManager = new URLManager(config);
	var promise, that= this;
	this.req = new Request();
	this.config = _.extend({}, config);
	this.chk;
};



Trooper.prototype.auth= function(){
var that = this;
var defer= q.defer();
if(this.config.pass){
	var data = {
		login: this.config.name,
		pass: this.config.pass
	};
	promise= this.req.post(this.urlManager.getLoginUrl(), data);
}else{	
	promise= this.req.send(this.urlManager.getMainTrooperUrl());
}

promise.then(function(response){

var cookie = response.getCookies();
var code = null; 
if(response.isRedirect()){
  	code= CookieManager.getTextByCookie(cookie);
  	if(that.config.pass){
 		code= code || 201;
  	}else{
  		code= code || 501;
  	}	
}else{
 	that.chk = CookieManager.getCHKByCookie(cookie);
 	console.log("code", response.isRedirect())
 	code= 201;
}

 defer.resolve({code: code, message: CookieMessages.auth[code]});
});
return defer.promise;
};





Trooper.prototype.makeMission = function(){
		var defer= q.defer(); 	
		var promise= this.req.send(this.urlManager.getMissionUrl(this.chk));
		promise.then(function(response){		
			var cookies= response.getCookies();
			if(cookies){
				var msg = CookieManager.getMessageByCookie(cookies);
				defer.resolve(msg);
			}else{
				defer.resolve(-1);
			}
		}, function(){ 
			console.log("not catched err")
		});
		return defer.promise;
};



Trooper.prototype.makeMissions= function(){
		var promise= q.all([
		this.makeMission(),
		this.makeMission(),
		this.makeMission()
		]);
		return promise;
};

Trooper.prototype.toString= function(){
	return "chk: "+this.chk;
};


module.exports =  Trooper;