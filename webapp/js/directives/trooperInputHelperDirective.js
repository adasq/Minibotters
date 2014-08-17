(function(){
'use strict'
var trooperInputHelper = function($log, $timeout){
     var link = function(scope, element, attr) {
            //content

            element.bind('keydown', function (event) {
				if (event.keyCode === 27) {
					scope.$apply(attr.trooperInputHelper)
				}
			});
			element.bind('blur', function (event) {
				 scope.$apply(attr.trooperInputHelper)
			})

            $timeout(function () {
						element[0].focus();
					}, 0, false);

        };

        return {
            link: link,           
            restrict: "A",           
        };
};
angular
.module("directives")
.directive("trooperInputHelper", trooperInputHelper);
})();