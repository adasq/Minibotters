(function(){

angular.module('controllers', []);
angular.module('services', []);
angular.module('factories', []);
angular.module('directives', []);


angular.module('myApp', [
  'factories',
   'directives',
  'controllers',
  'services',
  'ui.router',
  'ui.bootstrap'
]).
config(function($stateProvider, $urlRouterProvider) {
 
$urlRouterProvider.otherwise("/home");

var routes = [
{state: 'home', url: '/home', templateUrl: 'views/controllers/homeView.html'},,
{state: 'register', url: '/register', templateUrl: 'views/controllers/registerView.html'},
{state: 'login', url: '/login', templateUrl: 'views/controllers/loginView.html'},
];

_.each(routes, function(route){
  $stateProvider.state(route.state, route);
});
   
$stateProvider
.state('lists',{
url: '/lists',
abstract: true,
templateUrl: 'views/controllers/ListsView.html'
})
.state('lists.new', {
url: '/new',
templateUrl: 'views/controllers/NewListView.html'
})
.state('lists.all', {
url: '',
templateUrl: 'views/controllers/AllListsView.html'
})
.state('lists.show', {
url: '/{lid:[a-zA-Z0-9]{3,10}}',
templateUrl: 'views/controllers/ListView.html'
})
.state('lists.edit', {
url: '/{lid:[a-zA-Z0-9]{3,10}}/edit',
templateUrl: 'views/controllers/EditListView.html'
})



});


})();


