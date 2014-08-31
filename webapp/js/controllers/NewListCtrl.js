(function(){
var NewList = function($scope, $log, $rootScope, TrooperListModel, Utils){

	
	$scope.newList = new TrooperListModel({name: "", troopers: []});
	 
	$scope.saveList = function(){
	
		var promise = $scope.newList.save();
		promise.then(function(){
			$rootScope.$emit('mbSyncLists', {});
			Utils.redirect("lists.show", {lid: $scope.newList.data.name});
		}, function(){
			$log.log("errr");
		})
		
	}

};
angular
.module("controllers")
.controller("NewList", NewList);
})();
