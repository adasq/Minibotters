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



this.getTrooperUpgradeInfo = function(b){
var $ = cheerio.load(b, {normalizeWhitespace: true}),
onclick, matcher, money = $('.money').text().trim(),
needToUpgrade = $("a[class='but_bg b3_bg img']").text().trim(),
availableSkills = [], i=0, items = $('div.box8'), itemsLength= items.length;
for(;i<itemsLength;++i){
	$ = cheerio.load(items.eq(i).html());	
	onclick= items.eq(i)[0].attribs.onclick;
	matcher = onclick.match(/\?skill=\d+&/); 
	onclick = matcher && matcher[0].substr(7).slice(0,-1);
		availableSkills.push({
			skillId: onclick,
			name: $('h2').text(),
			description: $('.s').text()
		});
}
 return availableSkills;
};










};