(function(){
var login = function($scope, $log, $state, AlertManager, FormManager, RequestHandler, Auth){

	var alertManager = new AlertManager($scope);	
	//alertManager.setDangerAlert({msg: "siemanko"});


	//alertManager.setSuccessAlert({msg: "siemanko2"});
	var errorHandler = function(response){
		alertManager.setDangerAlert(response);
	};

	// RequestHandler.send('generateList', {name: "ziemniaki3"}).then(function(response){
	// 		$log.log(response);
	// });
	
	var successHandler = function(response){
		$scope.base.setUser(response.user);
		$state.go('home');
	};

	var getFieldByName = function(name){
		return _.find($scope.form.fields, function(field){
			return (field.field_name === name);
		});
	};
	$scope.form = {
				submit: function(){		 
					var promise = Auth.login(FormManager.getModelData(this.fields));
					promise.then(successHandler, errorHandler);
				},				
		 		fields: [
						{
						                "field_title" : "login",
						                "field_value" : "yebieoll",
						                "field_placeholder": "login",
						                "field_type": "text",
						                "field_name" : "name",
						                "field_required" : true,
										"field_disabled" : false,
										"field_validator": function(val){											
											return (val && val.length > 3);
										}
						},						
						{
						                "field_title" : "password",
						                "field_value" : "",
						                "field_placeholder": "password",
						                "field_type": "password",
						                "field_name" : "pass",
						                "field_required" : true,
										"field_disabled" : false,										
						}
						
		 		]
	};

};
angular
.module("controllers")
.controller("login", login);
})();
