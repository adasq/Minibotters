var URLManager = require('./URLManager');  
var PageParser = require('./PageParser');  
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
	promise= this.req.send(this.urlManager.getBaseUrl());
}

promise.then(function(response){

var cookie = response.getCookies();
var code = null; 
if(response.isRedirect()){
  	code= CookieManager.getTextByCookie(cookie);
  	if(that.config.pass){
  		that.chk = CookieManager.getCHKByCookie(cookie); 
 		code= code || 201;
  	}else{
  		code= code || 501;
  	} 
}else{
 	that.chk = CookieManager.getCHKByCookie(cookie); 
 	code= 201;
}
 defer.resolve({code: code, message: CookieMessages.auth[code]});
});
return defer.promise;
};



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

//==========================================================
Trooper.prototype.getArmyList = function(){
console.log("Wait for your list...")
	var armyMembersList=[], promiseList= [], list, promise, that=this, parser= new PageParser(), defer= q.defer();

promise = this.req.get(this.urlManager.getTrooperArmyPageList());
promise.then(function(body){

list = parser.getTrooperArmyList(body);
_.each(list, function(trooperId){
promise = that.req.get(that.urlManager.getTrooperArmyMemberDetalis(trooperId));
promiseList.push(promise);
});
q.all(promiseList).then(function(pages){
	_.each(pages, function(trooperArmyMemberPage){
		 var detalis = parser.getTrooperDetalis(trooperArmyMemberPage);		
		 armyMembersList.push(detalis);		 
	});
	defer.resolve(armyMembersList);
});
});
return defer.promise;
};
//==========================================================

Trooper.prototype.getTrooperSkillList = function(trooperId){
var parser= new PageParser(), trooper = (trooperId || 0), that= this, defer= q.defer(); 

var promise = this.req.get(this.urlManager.getTrooperUrl(trooper));
promise.then(function(body){ 
	var trooperInfo = parser.getTrooperInfo(body);
	defer.resolve(trooperInfo);
});
		return defer.promise;	
};

//==========================================================


Trooper.prototype.getTrooperUpgradeSkillList = function(trooperId){
var parser= new PageParser(), trooper = (trooperId || 0), that= this, defer= q.defer(); 

var promise = this.req.get(this.urlManager.getTrooperUrl(trooper));
promise.then(function(body){ 
	var availableSkills = parser.getTrooperUpgradeInfo(body);
	defer.resolve(availableSkills);
}); 


		return defer.promise;	
};

//==========================================================







Trooper.prototype.makeBattle = function(opponent){
		var that= this, defer= q.defer(); 
		var data = {
			chk: that.chk,
			friend: opponent || that.config.opponent,
		};
		var promise= this.req.post(this.urlManager.getBattleUrl(), data);
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

Trooper.prototype.makeRaid = function(){
		var defer= q.defer(); 	
		var promise= this.req.send(this.urlManager.getRaidUrl(this.chk));
		promise.then(function(response){		
			var cookies= response.getCookies();	
			var headers = response.getHeaders();
			if(cookies){
				var msg = CookieManager.getMessageByCookie(cookies);
				defer.resolve(msg);
			}else{
				defer.resolve(-174);
			}
		}, function(){ 
			console.log("not catched err")
		});
		return defer.promise;
};
 
Trooper.prototype.upgrade = function(trooper){

		var defer= q.defer(); 	 
		var promise= this.req.send(this.urlManager.getTrooperUpgradeUrl(this.chk, trooper));
		promise.then(function(response){	
			var headers = response.getHeaders();
			var cookies= response.getCookies();	
		 if(cookies){
				var code = CookieManager.getTextByCookie(cookies);
				defer.resolve(code);
			}else{
				switch(headers['location']){
				case ('/levelup/'+(trooper || 0)):				
					defer.resolve(501);
				break;
				case  ('/t/'+(trooper || 0)):
					defer.resolve(503);
				break;
				case  '/hq':
					defer.resolve(504);
				break;
			};

			}			
		}, function(){ 
			console.log("not catched err")
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

Trooper.prototype.makeRaids= function(){	 
		var results = [], that= this, defer= q.defer(); 	
		var makeRaid = function(){
			that.makeRaid().then(function(result){
				results.push(result);
				if(result === 142){
					defer.resolve(results);
				}else{
					makeRaid();
				}
			});
		};
		makeRaid();
		return defer.promise;
};

Trooper.prototype.makeBattles= function(){
		var promise= q.all([
		this.makeBattle(),
		this.makeBattle(),
		this.makeBattle()
		]);
		return promise;
};

Trooper.prototype.selectSkill = function(trooperId, skill){
	var trooper = (trooperId || 0), that= this, defer= q.defer(); 
	var promise = this.req.send(this.urlManager.getSelectUpgradeSkillUrl(this.chk, trooper, skill));
	promise.then(function(response){ 
		var headers= response.getHeaders();	
		var location = headers['location'];	
		var cookies= response.getCookies();
		if(cookies){	
			if(headers['location'] === '/hq'){
				defer.resolve('*');
			}else{
				console.log("unexcepted1");
			}	
		 }else{		 	
		 		if(!location){
		 			 defer.resolve(501);
		 		}else{
		 			switch(location){
		 				case ('/t/'+trooper): 
		 					defer.resolve(502);
		 				break;
		 				case '/hq':
		 					defer.resolve(503);
		 				break;
		 				default: 
		 					console.log('unexcepted2')
		 				break;
		 			}
		 		}
		 		defer.resolve(-1);
				
		}
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


var preventAuthChecking = ['auth', 'toString'],
checkAuth = function(){	 
	return !!this.chk;
};
 
_.each(Trooper.prototype, function(val, name){	
	if(_.isFunction(Trooper.prototype[name]) && !_.contains(preventAuthChecking, name)){
		var oldFunction = Trooper.prototype[name];
		Trooper.prototype[name] = function(){	
			var isAuthorized= checkAuth.call(this);
			if(isAuthorized){
				return oldFunction.apply(this, arguments);
			}else{
				throw "You need to authorize, in order to call "+name+"() method.";
			}		 
			
		};
	}	
});


module.exports =  Trooper;