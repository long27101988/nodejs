exports.version = "0.5.0";

exports.send_failure = function(res, http_code, err){
	var code = err.code ? err.code : err.name;
	res.set("Content-Type", "application/json");
	res.status(http_code);
	res.send(JSON.stringify({error: code, message: err.message, data: null}) + "\n");
}

exports.send_success = function(res, data){
	res.set("Content-Type", "application/json");
	res.status(200);
	res.send(JSON.stringify({error: null, message: null, data: data}) + "\n");
}