(function(){
'use strict'
var ListManagerView = function($log){
	 var link = function(scope, element, attr) {

            scope.$watch('troopers', function(){
            	
            });
        };
        return {
            link: link,
            scope: {
            	troopers: "="
            },
            restrict: "E",
            templateUrl: "views/directives/ListManagerViewView.html"
        };
};
angular
.module("directives")
.directive("mbListManagerView", ListManagerView);
})();