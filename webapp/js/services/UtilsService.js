(function(){
var Utils = function($state){

this.redirect = function(targetState, targetParams){
	$state.go(targetState, targetParams);
}
	

};
angular
.module("services")
.service("Utils", Utils);
})();
