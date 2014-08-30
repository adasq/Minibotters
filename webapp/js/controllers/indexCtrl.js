(function(){
var index = function($scope, $log, $state, $rootScope, Auth){  

	var currentState = "";

	$scope.base = {
		auth: null,
		setUser: function(user){		
				$scope.base.auth = {
					user: user || undefined,
					loggedIn: !!user
				}				
		}		
	};

	var handlePossibleRedirection = function(event){
		var isLoggedIn = $scope.base.auth && $scope.base.auth.loggedIn;
		var isStateAllowedForUnauthorized = _.contains(['register', 'login', 'home'], currentState);
		var isStateAllowedForAuthorized = !_.contains(['register', 'login'], currentState);
		if(!isLoggedIn){
			if(!isStateAllowedForUnauthorized){
				event && event.preventDefault();
				$state.go('login');					
			}
		}else{
			if(!isStateAllowedForAuthorized){
				event && event.preventDefault();			
			}
		}
	};


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){
		currentState = toState.name;  
		handlePossibleRedirection(event);		
	});

	$scope.$watch('base.auth', function(newValue){
			newValue && handlePossibleRedirection();
	});


	



Auth.getUser().then(function(response){		
		$scope.base.setUser(response.user);		
}, function(){
		$scope.base.setUser(null);
});


$scope.logout = function(){
	Auth.logout().then(function(){		
		$scope.base.setUser(null);		
	});
};

};
angular
.module("controllers")
.controller("index", index);
})();
