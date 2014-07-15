var _ = require('underscore');
var cheerio = require('cheerio'); 

module.exports =  function(){

this.getTrooperInfo = function(b){
var $ = cheerio.load(b, {normalizeWhitespace: true});

var money = $('.money').text().trim();
var needToUpgrade = $("a[class='but_bg b3_bg img']").text().trim();

var items = $('li.on');
var skills = [];
_.each(items, function(val, name){
	var diva = items[name].attribs.onmouseover;
	diva= diva.substr(21, diva.length-21-2).replace(/\\\'/g, "'");
	$ = cheerio.load(diva);
	var title = ( $('.tipcontent h1').text().trim()); 
	var desc = ( $('.s').text().trim()); 
	skills.push({
		title: title,
		desc: desc
	});
});
var needToUpgrade = needToUpgrade.split(" ");
needToUpgrade = needToUpgrade[needToUpgrade.length-1];
return {
	skills: skills,
	money: +money,
	needToUpgrade: +needToUpgrade
};

};

};