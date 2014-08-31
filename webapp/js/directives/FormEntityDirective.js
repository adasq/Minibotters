(function(){
'use strict'
var FormEntity = function($http, $compile, $templateCache){
	var linker = function(scope, element) {
            $http.get("./views/directives/FormEntityView.html").then(function(template){
                element.html(template.data);
                $compile(element.contents())(scope);
            });
        }
        return {            
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
};
angular
.module("directives")
.directive("mbFormEntity", FormEntity);
})();