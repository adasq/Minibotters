(function(){
var Trooper = function(RequestHandler){

	this.generateList = function(data){
		return RequestHandler.send("generateList", data);	
	};

};
angular
.module("services")
.service("Trooper", Trooper);
})();
