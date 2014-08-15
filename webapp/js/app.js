'use strict';

angular.module('controllers', []);

angular.module('myApp', [
  'controllers',
  'ui.router'
]).
config(['$stateProvider', function($stateProvider) {

 $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "views/view1.html"
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "views/view2.html"
    });

    
}]);
