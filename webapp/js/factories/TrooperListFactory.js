(function(){
var TrooperListModel = function($log, $q, TrooperList){

	var TrooperListModel = function(data){
		this.data = data || null;
	};

	TrooperListModel.getListByName = function(name){
		var deffered = $q.defer();
		var promise= TrooperList.getListByName({name: name});
		promise.then(function(resposne){
			deffered.resolve(new TrooperListModel(resposne));
		}, deffered.reject);
		return deffered.promise;
	};

	TrooperListModel.getLists = function(){
		var deffered = $q.defer();
		var promise= TrooperList.getLists();
		promise.then(function(resposne){		 
			var lists = [];
			 _.each(resposne, function(list){
			 	lists.push(new TrooperListModel(list));
			 });
			deffered.resolve(lists);

		}, deffered.reject);
		return deffered.promise;
	};
	TrooperListModel.prototype.getNormalizedData = function(){
		var normalizedData = {};
		normalizedData._creator = this.data._creator;
		normalizedData._id = this.data._id;
		normalizedData.name = this.data.name;
		normalizedData.troopers = [];
		_.each(this.data.troopers, function(trooper){
			normalizedData.troopers.push({name: trooper.name, pass: trooper.pass, _id: trooper._id});
		});
		return normalizedData;
	
	}
	TrooperListModel.prototype.save = function(){
		var deffered = $q.defer(); 
		if(this.data._id){
			//update
			var promise = TrooperList.updateList(this.getNormalizedData());
			promise.then(function(response){
				response.error?deffered.reject(response.reason):deffered.resolve();				
			}, function(){
				deffered.reject('unhandled!');
			})
		}else{
			//save
			var promise = TrooperList.createList(this.data);
			promise.then(function(response){				 
				response.error?deffered.reject(response.reason):deffered.resolve();	
			}, function(){
				deffered.reject('unhandled!');
			});
		}
		return deffered.promise;
	};

	return TrooperListModel;

};
angular
.module("factories")
.factory("TrooperListModel", TrooperListModel);
})();
