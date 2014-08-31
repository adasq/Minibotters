(function(){
var EditList = function($scope, $state, $log, $rootScope, TrooperListModel, Utils){

 
 $scope.currentList=null;
 
TrooperListModel.getListByName($state.params.lid).then(function(list){
	$scope.currentList= list;
}, function(response){
	Utils.redirect('lists.all');
});


$scope.updateList = function(){
	var promise= $scope.currentList.save();
	promise.then(function(){
		$rootScope.$emit('mbSyncLists', {});
		Utils.redirect('lists.show', {lid: $scope.currentList.data.name});
	}, function(reason){
		$log.log(reason);
	});
};


};
angular
.module("controllers")
.controller("EditList", EditList);
})();
