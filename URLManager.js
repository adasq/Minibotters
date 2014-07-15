module.exports = function(config){



	var domain = config.domain;
	var name = config.name;
	var baseUrl = "http://"+name+".minitroopers."+domain+"/";



	this.getBaseUrl= function(){
		return baseUrl+"hq";
	};
	this.getMissionUrl= function(chk){
		return baseUrl+"b/mission?chk="+chk;
	};
	this.getMainTrooperUrl= function(){
		return baseUrl+"t/0";
	};
	this.getLoginUrl = function(){
		return baseUrl+"login";
	}

}; 