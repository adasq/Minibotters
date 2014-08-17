(function(){
var home = function($scope, $log, $state, $location, $anchorScroll, Trooper, AlertManager){

$scope.current= null;

$scope.order = {
	key: "",
	reverse: true,
	setOrder: function(key){
		// $scope.order = {};
		// return;
		$log.log($scope.order);
		$scope.order = _.extend($scope.order, {
			key : key,
		 	reverse : !$scope.order.reverse
		});	 
		$log.log($scope.order);
	}
}


var alertManager = new AlertManager($scope);	
	alertManager.setDangerAlert({msg: "siemanko"});

$scope.selected = 0;
$scope.updateSelected = function(){
	$scope.selected= _.filter($scope.troopers, function(trooper){return trooper.selected;}).length;
};

$scope.handleTrooperSelection = function(action){
	$log.log(action)
	if(_.isBoolean(action)){
		_.each($scope.troopers, function(trooper){
			trooper.selected = action;
		});
	}else{
		_.each($scope.troopers, function(trooper){
			trooper.selected = !trooper.selected;
		});
	}
	$scope.updateSelected();	
};

$scope.deleteSelected = function(){
	$scope.troopers = _.filter($scope.troopers, function(trooper){return !trooper.selected});
	$scope.updateSelected();	
}

$scope.selectTrooper =  function(trooper){
				trooper.selected = !trooper.selected;	
				$scope.updateSelected();
};


var promise = Trooper.generateList({name: "ziemniaki3"});
promise.then(function(response){
	var i = 0;
	_.each(response.armyList, function(trooper){
		trooper.id = ++i;

	});
	$scope.troopers = response.armyList;
});
	
$scope.newTrooper =  "";

$scope.calncelEditindTrooper= function(trooper){
	trooper.edited=false;
	trooper.edited2=false;
}
//$('#xd').scrollTop($('#trooper-6').offset().top);
$scope.addTrooper = function(){
	if(!$scope.newTrooper)return;

_.each($scope.troopers, function(trooper){
	trooper.highlighted=false;
});
var id = $scope.troopers.length;
	$log.log($scope.newTrooper);
	var splited = $scope.newTrooper.split(';');

	$scope.troopers.unshift({
	name: splited[0],
	pass: splited[1] || "",
	id: id,
	highlighted: true
});

	 $location.hash('trooper-'+id);
      $anchorScroll();
	$scope.newTrooper = "";
};

$scope.keyPressed = function(event){
	$log.log(event)
	if(event.charCode === 13){
			$scope.addTrooper();
			
	}
}

$scope.removeTrooper = function(id){
	$scope.troopers = _.without($scope.troopers, _.findWhere($scope.troopers, {id: id}));
	$scope.updateSelected();
};


$scope.lists = [
"list1",
"list2",
];


$scope.troopers = [
{
	name: "name1",
	pass: "pass1",
	selected: false,
	id: 1
},
{
	name: "name2",
	selected: false,
	pass: "pass1",
	id: 2
},
{
	name: "name3",
	selected: false,
	pass: "pass1",
	id: 3
},
{
	name: "name4",
	selected: false,
	pass: "pass1",
	id: 4
}
];


};
angular
.module("controllers")
.controller("home", home);
})();
