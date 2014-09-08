(function(){
var home = function($timeout, $scope, $log, $state, $location, $anchorScroll, Trooper, AlertManager, TrooperListModel){


// $timeout(function(){
// 	$scope.family = { "name": "flare", "children": [
// { "name": "flare1", "children": []},
// { "name": "222", "children": []},
// { "name": "sss", "children": []},
// { "name": "zzz", "children": []}
// ]};

// init(root);

// },1000);

 
var promise = Trooper.generateFamily();
promise.then(function(family){
	$scope.family = family;
});
};
angular
.module("controllers")
.controller("home", home);
})();
