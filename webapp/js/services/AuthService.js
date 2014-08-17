(function(){
var Auth = function(RequestHandler){

	this.login = function(data){
		return RequestHandler.send("login", data);	
	};

	this.register = function(data){
		return RequestHandler.send("register", data);	
	};

	this.getUser = function(){		
		return RequestHandler.send("getUser", {});	
	}
	this.logout = function(){		
		return RequestHandler.send("logout", {});	
	}

};
angular
.module("services")
.service("Auth", Auth);
})();
