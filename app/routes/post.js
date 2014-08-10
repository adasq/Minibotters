var db = require('../db/connect');

var routes = [];

routes.push({
	url: "/login",
	callback: function(req, res){
			var params = req.route.params;
			console.log(req.route)
			res.send({x:params, a: "xxx"});
		}
});


module.exports = routes;