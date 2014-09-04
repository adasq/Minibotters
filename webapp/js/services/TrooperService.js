(function(){
var Trooper = function(RequestHandler){

	this.generateList = function(data){
		return RequestHandler.send("generateList", data);	
	};

	this.play = function(data){
		return RequestHandler.send("play", data);	
	};

};
angular
.module("services")
.service("Trooper", Trooper);
})();
