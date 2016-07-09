var fs = require('fs');

exports.version = "0.5.0";


exports.serve_page = function(req, res){

	var page_name = req.params.page_name;
	fs.readFile('./public/view/layout.html', 'utf8', function(err, content){
		if(err){
			res.writeHead(503, {"Content-Type": "text/html"});
			res.end("Oh no can not load template");
			return;
		}

		res.writeHead(200, {"Content-Type":"text/html"});
		res.end(content.replace("{{PAGE_NAME}}", page_name));
	});
}