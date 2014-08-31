(function(){
'use strict'
var ListNameValidator = function($log, TrooperList){
     var link = function(scope, element, attr, controller) {
            $log.log("mbListNameValidator");

 controller.$parsers.push(function (modelValue) {
 		controller.$setValidity('mbListNameValidator', TrooperList.validName(modelValue));
		return modelValue; 
        });



        };
        return {
            link: link,
            scope: false,
            require: "ngModel", 
            restrict: "A"          
        };
};
angular
.module("directives")
.directive("mbListNameValidator", ListNameValidator);
})();