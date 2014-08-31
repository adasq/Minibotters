(function(){
'use strict'
var ListManager = function($log, $state, $location, $anchorScroll, Trooper){
	 var link = function($scope, element, attr) {
//==========================================================================

$scope.current= null;

$scope.selected = 0;
$scope.updateSelected = function(){
	$scope.selected= _.filter($scope.list.troopers, function(trooper){return trooper.selected;}).length;
};

$scope.handleTrooperSelection = function(action){
	$log.log(action)
	if(_.isBoolean(action)){
		_.each($scope.list.troopers, function(trooper){
			trooper.selected = action;
		});
	}else{
		_.each($scope.list.troopers, function(trooper){
			trooper.selected = !trooper.selected;
		});
	}
	$scope.updateSelected();	
};

$scope.deleteSelected = function(){
	$scope.list.troopers = _.filter($scope.list.troopers, function(trooper){return !trooper.selected});
	$scope.updateSelected();	
};

$scope.selectTrooper =  function(trooper){
				trooper.selected = !trooper.selected;	
				$scope.updateSelected();
};
	
$scope.newTrooper =  "";

$scope.calncelEditindTrooper= function(trooper){
	trooper.edited=false;
	trooper.edited2=false;
}
//$('#xd').scrollTop($('#trooper-6').offset().top);
$scope.addTrooper = function(){
	if(!$scope.newTrooper)return;

_.each($scope.list.troopers, function(trooper){
	trooper.highlighted=false;
});
var id = $scope.list.troopers.length;
	$log.log($scope.newTrooper);
	var splited = $scope.newTrooper.split(';');

	$scope.list.troopers.unshift({
	name: splited[0],
	pass: splited[1] || "",
	highlighted: true
});

	 $location.hash('trooper-'+id);
      $anchorScroll();
	$scope.newTrooper = "";
};

$scope.keyPressed = function(event){
	if(event.charCode === 13){
			$scope.addTrooper();			
	}
}

$scope.removeTrooper = function(id){
	$scope.list.troopers = _.without($scope.list.troopers, _.findWhere($scope.list.troopers, {id: id}));
	$scope.updateSelected();
};


//==========================================================================
        };
        return {
            link: link,
            scope: {
            	list: "="
            },
            restrict: "E",
            templateUrl: "views/directives/ListManagerView.html"
        };
};
angular
.module("directives")
.directive("mbListManager", ListManager);
})();