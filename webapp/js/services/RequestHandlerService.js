(function(){
var RequestHandler = function($http, $log, $q){
	var API_URL = "";
	
	this.send= function(method, data){

		var defer = $q.defer(),
		successCallback= function(response){
			if(response.error){
				$log.log("!!!! ",response.reason.msg);
				defer.reject(response.reason)
			}else{
				defer.resolve(response.response);
			}			
		},
		errorCallback= function(response){
			$log.log("!!!! ",response);
			defer.reject(response);
		};

		$http({
			method: "POST",
			data: data,
			url: API_URL+'/'+method			
		}).success(successCallback).error(errorCallback);

		return defer.promise;
	};
};
angular
.module("services")
.service("RequestHandler", RequestHandler);
})();
