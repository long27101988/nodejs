
var express = require('express'),
	path = require('path'),
	album_hdlr = require('./handlers/albums.js'),
	page_hdlr = require('./handlers/pages.js'),
	responseTime = require('response-time'),
	bodyParser = require('body-parser'),
	serveStatic = require('serve-static'),
	fs = require('fs');

var app = express();

app.use(responseTime());
app.use(bodyParser());
app.use(serveStatic(__dirname));
/*app.use(function(req, res, next){
	console.log('test middleware');
	next();
});*/

app.get('/album.json', album_hdlr.load_albums);
app.get('/album/:album_name.json', album_hdlr.get_albums);
app.get('/pages/:page_name', page_hdlr.serve_page); 


app.get('*', function(req, res){
	res.writeHead(404, {"Content-Type" : "application/json"});
	res.end(JSON.stringify({error : "unknown_resource"}));
});

app.listen(3000);