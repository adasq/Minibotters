(function(){
'use strict'
var ListManagerView = function($log, Trooper){
	 var link = function(scope, element, attr) {
            scope.state = {
                DEFAULT: 0,
                IN_PROGRESS: 1,
                PLAYED: 2
            };
            scope.showHeadQuarters = function(trooper){
                var url = 'http://'+trooper.name+'.minitroopers.com/hq';
                $log.log(url)
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
            	 $log.log(nv)
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
                Trooper.play({tid: trooper._id, lname: attr.lname}).then(function(response){                   
                    trooper.ui.state = scope.state.PLAYED;
                    $log.log(response)
                    var troopeFights= response.fight;
                    var trooperInfo = response.skills;
                    trooper.fights = {
                        battle: troopeFights[0],
                        mission: troopeFights[1],
                        raid: troopeFights[2],
                    };
                    trooper.upgradeSkills = response.upgrade;
      
                    trooper.skills = trooperInfo.skills;
                    trooper.needToUpgrade = trooperInfo.needToUpgrade;
                    trooper.money = trooperInfo.money;
                });
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