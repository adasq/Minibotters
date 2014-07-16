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
		this.getRaidUrl= function(chk){
		return baseUrl+"b/raid?chk="+chk;
	};
	this.getBattleUrl= function(){
		return baseUrl+"b/battle";
	};
	this.getTrooperUpgradeUrl= function(chk, trooper){
		return baseUrl+"t/"+(trooper || 0)+"?levelup="+chk;
	};
	this.getMainTrooperUrl= function(){
		return baseUrl+"t/0";
	};
	this.getLoginUrl = function(){
		return baseUrl+"login";
	}

}; 