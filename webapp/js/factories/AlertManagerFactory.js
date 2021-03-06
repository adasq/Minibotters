(function(){
var AlertManager = function($log, $timeout){
	var AlertManager = function(scope){
		var def = {
			visible: false, 
			hide: function(fn){				
				this.visible = false;
				fn && $timeout(fn,10);
				
			}
		};
		this.scope = scope;
		this.alert = scope.alert = scope.alert || def; 

	};

	AlertManager.prototype.setDangerAlert = function(obj){
			var that = this;
			this.alert.hide(function(){
				that.alert.type = 'danger';
				that.alert.visible = true;
				that.alert.msg = obj.msg || "no message";
			});	
	};
	AlertManager.prototype.setSuccessAlert = function(obj){
			var that = this;
			this.alert.hide(function(){
				that.alert.type = 'success';
				that.alert.visible = true;
				that.alert.msg = obj.msg || "no message";
			});
					
	};

	return AlertManager;

};
angular
.module("factories")
.service("AlertManager", AlertManager);
})();
