var fs = require('fs');
var helper = require('./helpers.js');

exports.version = "0.5.0";

exports.load_albums = function(req, res){
	load_album_list(function(err, album){
		if(err != null){
			helper.send_failure(res, 503, err);
			return;
		}
		
		helper.send_success(res, {albums: album});
	});
}

exports.get_albums = function(req, res){

	var album_name = req.params.album_name;
	var page = parseInt(req.query.page);
	var page_size = parseInt(req.query.page_size);

	if(isNaN(page) || page <=0) page = 0;
	if(isNaN(page_size) || page_size <=0) page_size = 1;

	
	load_album(album_name, page, page_size, function(err, album){
		if(err != null){
			helper.send_failure(res, 503, err);
			return;
		}

		helper.send_success(res, {album: {album_name: album_name, photos: album}});
	});
}

function load_album_list (callback){
	fs.readdir('content/',function(err, file_list){
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
			fs.stat('content/'+ file_list[i], function(err, stats){
				if(err){
					callback(err);
					return;
				}
				if(!stats.isDirectory()){
					dir_only.push({album_name : file_list[i], 
									title : file_list[i]});
					iterator(i + 1);
				}
			});
		})(0);
		//callback(null, dir_only);
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