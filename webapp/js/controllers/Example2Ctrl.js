(function(){
var Example2 = function($scope, $log, AlertManager){

	var alertManager = new AlertManager($scope);	
	alertManager.setDangerAlert({msg: "siemanko"});
	//alertManager.setSuccessAlert({msg: "siemanko2"});
	

	$scope.form = {
		 		fields: [
						{
										"field_id" : 2,
						                "field_title" : "Last Name",
						                "field_type" : "textfield",
						                "field_value" : "Doe",
						                "field_required" : true,
										"field_disabled" : false
						},
						{
										"field_id" : 2,
						                "field_title" : "Last Name2",
						                "field_type" : "textfield",
						                "field_value" : "Doxe",
						                "field_required" : true,
										"field_disabled" : false
						}
		 		]
	};
 
};
angular
.module("controllers")
.controller("Example2", Example2);
})();
