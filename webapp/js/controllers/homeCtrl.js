(function(){
var home = function($scope, $log, $state, $location, $anchorScroll, Trooper, AlertManager, TrooperListModel){


var data = {
	name: "listaNrNiewiem",
	troopers: [{name: "trooper1", pass: "trooper1pass"}]
}
//var list1 = new TrooperListModel(data);
//list1.save();


// TrooperListModel.getListByName("listaNrNiewiem").then(function(list){
// 	list.data.name = "listaNrNiewiem2";
// 	list.save();
// });

TrooperListModel.getLists().then(function(lists){
	$log.log(lists, "S")
});


Trooper.play({tname: 'ziemniaki2', lname:'asdasd'});


};
angular
.module("controllers")
.controller("home", home);
})();
