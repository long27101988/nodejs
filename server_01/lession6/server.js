var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

function handle_incomming_request(req, res){
	console.log("Incomming request :" + req.method + req.url);
	req.parsed_url = url.parse(req.url, true);
	var core_url = req.parsed_url.pathname;
	console.log(core_url);
	if(core_url.substr(0, 9) == "/contact/"){
		server_static_content(req, res);
	}else if(core_url == "/album.json"){
		handle_load_albums(req, res);
	}else if(core_url.substr(0, 6) == "/album" && core_url.substr(core_url.length - 5) == ".json"){
		handle_get_albums(req, res);
	}else{
		res.writeHead(404, {"Content-Type" : "application/json"});
		res.end(JSON.stringify({error : "unknown_resource"}));
	}
}

function server_static_content(req, res){
	
	var fn = req.parsed_url.pathname.substr(9);

	var rs = fs.createReadStream('content/'+ fn);

	var ct = get_content_type(fn);


	rs.on(
		"error",
		function(err){
			res.writeHead(404, {"Content-Type" : "application/json"});
			res.end(JSON.stringify({error: "resource_not_found", message: "What's that?"}));
		}
	);

	res.writeHead(200, {"Content-Type" : ct});
	rs.pipe(res);

	/*rs.on(
		"readable",
		function(){
			var d = rs.read();
			if(typeof d =="string"){
				res.write(d);
			}else if(typeof d == "object" && d instanceof Buffer){
				if(get_content_type(fn).substr(0, 6)== "image/" ){
					res.write(d);
				}else{
					res.write(d.toString('utf8'));
				}
			}
		}
	);

	rs.on(
		"end",
		function(){
			res.end();
		}
	);*/

	
}

function get_content_type(filename){

	var ext = path.extname(filename).toLowerCase();

	switch(ext){

		case '.jpg':
			return "image/jpeg";
		case '.gif':
			return "image/gif";
		case '.png':
			return "image/png";
		case '.js':
			return "text/javascript";
		case '.css':
			return "text/css";
		case ".html":
			return "text/html";
		default:
			return "text/plain";
	}
}


function handle_load_albums(req, res){
	load_album_list(function(err, album){
		if(err != null){
			res.writeHead(503, {"Content-Type" : "application/json"});
			res.end(JSON.stringify({error: "file_error", message: err.message}) + "\n");
			return;
		}
		
		res.writeHead(200, {"Content-Type" : "application/json"});
		res.end(JSON.stringify({error: null, data : {album: album}}) + "\n");
	});
}

function load_album_list(callback){
	fs.readdir('album/',function(err, file_list){
		if(err){
			callback(err);
			return;
		}
		var dir_only = [];
		//for(var i=0; i < file_list.length; i++ ){
		(function iterator(i){
			if(i >= file_list.length){
				callback(null, dir_only);
				return ;
			}
			fs.stat('album/'+ file_list[i], function(err, stats){
				if(err){
					callback(err);
					return;
				}
				if(stats.isDirectory()){
					dir_only.push(file_list[i]);
					iterator(i + 1);
				}
			});
		})(0);
		//callback(null, dir_only);
	});
}

function handle_get_albums(req, res){

	var core_url = req.parsed_url.pathname;
	var album_name = core_url.substr(7, core_url.length - 12);
	var page = parseInt(req.parsed_url.query.page);
	var page_size = parseInt(req.parsed_url.query.page_size);

	if(isNaN(page) || page <=0) page = 0;
	if(isNaN(page_size) || page_size <=0) page_size = 1;

	
	load_album(album_name, page, page_size, function(err, album){
		if(err != null){
			res.writeHead(503, {"Content-Type" : "application/json"});
			res.end(JSON.stringify({error: "file_error", message: err.message}) + "\n");
			return;
		}
		
		res.writeHead(200, {"Content-Type" : "application/json"});
		res.end(JSON.stringify({error: null, data : {album: {album_name: album_name, photos: album}}}) + "\n");
	});
}

function load_album(album_name, page, page_size, callback){
	fs.readdir('album/' + album_name,function(err, file_list){
		if(err){
			callback(err);
			return;
		}
		var file_only = [];
		//for(var i=0; i < file_list.length; i++ ){
		(function iterator(i){
			if(i >= file_list.length){
				var phots = file_list.splice(page * page_size, page_size);
				callback(null, phots);
				return ;
			}
			fs.stat('album/'+album_name+'/'+ file_list[i], function(err, stats){
				if(err){
					callback(err);
					return;
				}
				if(stats.isFile()){
					file_only.push(file_list[i]);
					iterator(i + 1);
				}
			});
		})(0);
		//callback(null, dir_only);
	});
}


var s = http.createServer(handle_incomming_request);
s.listen(3000);