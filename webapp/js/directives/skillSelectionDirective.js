(function(){
'use strict'
var skillSelection = function($log, $timeout){
	 var link = function(scope, element, attr) {
            //content 
            // $log.log(skills);

            var state = scope.state = {
            	DEFAULT: 0,
            	IN_PROGRESS: 1,
            	SUCCESS: 2,
            	ERROR: 3
            };
            scope.currentState = state.DEFAULT;


    //         scope.skills2 = [{ style: 'background : url(\'/img/skills.png\') -210px -90px',
    // skillId: '67',
    // name: 'Cold Blooded',
    // description: 'Snaps takes aim twice as quickly. "We\'re not going to waste time talking sense here..."' },
    // { style: 'background : url(\'/img/skills.png\') -0px -90px',
    // skillId: '60',
    // name: 'Toxic shells',
    // description: 'Snaps fires up to 3 toxic shells which poison the enemy. "You look a little off-colour there Roger. Are you sure you don\'t need a little liedown? "' }];


      scope.selectSkill = function(skill){
      	$log.log(skill)
      	scope.currentState = state.IN_PROGRESS;
      	$timeout(function(){
      		scope.selectedSkill = skill;
      		scope.currentState = state.SUCCESS;
      	}, 1000);
      }

        };
        return {
            link: link,
            scope: {
            	skills: "=",
            	callback: "="
            },
            restrict: "E",
            templateUrl: "views/directives/skillSelectionView.html"
        };
};
angular
.module("directives")
.directive("mbSkillSelection", skillSelection);
})();