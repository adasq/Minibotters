(function(){
'use strict'
var FormEntity = function($http, $compile, $templateCache){
	var linker = function(scope, element) {
            // GET template content from path

            $http.get("./views/directives/FormEntityView.html").then(function(template){
                element.html(template.data);
                $compile(element.contents())(scope);
            });

                

          
        }
        return {
            template: '<div>{{field}}</div>',
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