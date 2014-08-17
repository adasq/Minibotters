(function(){
var index = function($scope, $log, $state, $rootScope, Auth){  
	//Auth.logout();


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
		var isLoggedIn = ($scope.base.auth && $scope.base.auth.loggedIn);
		var isStateAllowedForUnauthorized = _.contains(['register', 'login', 'home'], toState.name);
		var isStateAllowedForAuthorized = !_.contains(['register', 'login'], toState.name);

		if(!isLoggedIn){
			if(!isStateAllowedForUnauthorized){
				event.preventDefault();
				$state.go('login');					
			}
		}else{
			if(!isStateAllowedForAuthorized){
				event.preventDefault();
				$state.go(fromState.name);		
			}
		}
	});


	$scope.base = {
		auth: null,
		setUser: function(user){		
				$scope.base.auth = {
					user: user || undefined,
					loggedIn: !!user
				}				
		}
	};

	Auth.getUser().then(function(response){
		$log.log(response);
		$scope.base.setUser(response.user);
	}, function(){
		$scope.base.setUser(null);
	});


$scope.logout = function(){
	Auth.logout().then(function(){		
		$scope.base.setUser(null);
		
	});

}

};
angular
.module("controllers")
.controller("index", index);
})();
