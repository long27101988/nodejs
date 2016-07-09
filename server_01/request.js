var http = require('http');
var fs = require('fs');

function handle_incomming_request(req, res){
	console.log("Incomming request :" + req.method + req.url);
	console.log("\n\n\n\n");
	console.log(req);
	console.log("\n\n\n\n");
	console.log(res);
	console.log("\n\n\n\n");
	console.log("\n\n\n\n");
}



var s = http.createServer(handle_incomming_request);
s.listen(3000);