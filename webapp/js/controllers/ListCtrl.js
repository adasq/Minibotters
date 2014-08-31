(function(){
var List = function($scope, $log, $timeout, $state, TrooperListModel, Utils){

	


//  var promise = Trooper.generateList({name: "ziemniaki3"});
// promise.then(function(response){
// 	var i = 0;
// 	_.each(response.armyList, function(trooper){
// 		trooper.id = ++i;

// 	});
// 	$scope.troopers = response.armyList;
// });
$scope.list=null;
 
TrooperListModel.getListByName($state.params.lid).then(function(list){
	$scope.list = list;
}, function(response){
	Utils.redirect('lists.all');
});


};
angular
.module("controllers")
.controller("List", List);
})();
