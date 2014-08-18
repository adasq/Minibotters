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
{state: 'example', url: '/example', templateUrl: 'views/controllers/ExampleView.html'},
{state: 'example2', url: '/example2', templateUrl: 'views/controllers/Example2View.html'},
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
template: '<h3>new!</h3>'
})
.state('lists.all', {
url: '',
templateUrl: 'views/controllers/ListView.html'
})
.state('lists.show', {
url: '/{contactId:[0-9]{1,4}}',
template: '<h3>show<div ui-view></div></h3>'
})
.state('lists.show.edit', {
url: '/edit',
template: '<h3>edit</h3>'
})



});


})();


