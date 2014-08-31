(function(){
var Lists = function($scope, $rootScope, $log, TrooperListModel){


$scope.lists = null; 
	

var sync = function(){
	TrooperListModel.getLists().then(function(lists){
	$scope.lists = lists;
	});
};


$rootScope.$on('mbSyncLists', function(){
	$log.log("mbSyncLists");
	sync();
});



sync();

};
angular
.module("controllers")
.controller("Lists", Lists);
})();
