(function(){
'use strict'
var Alert = function(){
	 	var link = function(scope, element, attr) {
            //content            
        };
        return {
            link: link,
            scope: false,
            restrict: "E",
            templateUrl: "views/directives/AlertView.html"
        };
};
angular
.module("directives")
.directive("mbAlert", Alert);
})();