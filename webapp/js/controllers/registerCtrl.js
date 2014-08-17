(function(){
var register = function($scope, $log, AlertManager, FormManager, RequestHandler, Auth){

	var alertManager = new AlertManager($scope);

	var errorHandler = function(response){
		alertManager.setDangerAlert(response);
	};
	var successHandler = function(response){
		alertManager.setSuccessAlert({msg: "An account has been created successfully"});		
	};
	$scope.show = function(){
		alertManager.setSuccessAlert({msg: "An account has been created successfully"});
	};

	// RequestHandler.send('generateList', {name: "ziemniaki3"}).then(function(response){
	// 		$log.log(response);
	// });



	var getFieldByName = function(name){
		return _.find($scope.form.fields, function(field){
			return (field.field_name === name);
		});
	};
	$scope.form = {
				submit: function(){		 
					var promise = Auth.register(FormManager.getModelData(this.fields));
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
						                "field_title" : "e-mail",
						                "field_value" : "yebieoll@gmail.com",
						                "field_placeholder": "example@gmail.com",
						                "field_type": "email",
						                "field_name" : "mail",
						                "field_required" : true,
										"field_disabled" : false
						},
						{
						                "field_title" : "password",
						                "field_value" : "",
						                "field_placeholder": "password",
						                "field_type": "password",
						                "field_name" : "pass",
						                "field_required" : true,
										"field_disabled" : false,
										"notify": function(){
											getFieldByName("pass2").triggerValidation();
										}
						},
						{
						                "field_title" : "password again",
						                "field_value" : "",
						                "field_placeholder": "password again",
						                "field_type": "password",
						                "field_name" : "pass2",
						                "field_required" : true,
										"field_disabled" : false,
										"field_validator": function(value){					
											return (value && value === getFieldByName("pass").field_value);
										}
						}
		 		]
	};

};
angular
.module("controllers")
.controller("register", register);
})();
