(function(){
'use strict'
var ListManagerView = function($log, Trooper){
	 var link = function(scope, element, attr) {
            scope.state = {
                DEFAULT: 0,
                IN_PROGRESS: 1,
                PLAYED: 2
            };

            var selectTrooperById = function(tid){
                _.each(scope.troopers, function(trooper){
                    trooper.ui.selected = (trooper.ui.selected?false:(trooper._id === tid));
                });
            };
            scope.selectTrooper= function(trooper){
                selectTrooperById(trooper._id)
            };

            scope.$watch('troopers', function(nv){
            	 
                if(nv){
                    _.each(scope.troopers, function(trooper){
                        trooper.ui = {
                            state: scope.state.DEFAULT,
                            infoViewVisible: false
                        };
                    });
                }
            });
            scope.play = function(trooper){  
                trooper.ui.state = scope.state.IN_PROGRESS;    
                Trooper.play({tid: trooper._id, lname: 'asdasd'}).then(function(response){
                    $log.log(response);
                    trooper.ui.state = scope.state.PLAYED;
                    //infoViewVisible
                    trooper.skills = response.skills,
                    trooper.money = response.money

                })
            }
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