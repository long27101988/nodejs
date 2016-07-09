var express = require('express');

var app = express();

bodyParser = require('body-parser');
cookieParser = require('cookie-parser');
session = require('express-session');
serveStatic = require('serve-static');
multiparty = require('multiparty');
basicAuth = require('basicauth-middleware');





app.use(bodyParser({keepExtensions:true}));
app.use(cookieParser());
app.use(session({
	secret : 'mrlong1206@gmail.com',
	cookie : {maxAge: 86400000},
	store : new session.MemoryStore()
}));
//app.use(basicAuth("username", "secret"));


app.get('/', function(req, res){
	res.end("Home page \n");
});

app.get('/users', function(req, res){
	res.end("user page \n");
});

app.get('/albums', function(req, res){
	res.end("albums \n");
});


app.get('/albums/:album_name/photos', function(req, res){
	res.end("photo page \n");
});

app.get('/admin', basicAuth(function(username, password){
	if(username === "long" && password === "123") {
		return true;
	}
}), function(req, res){
	res.end("Admin page \n");
});



/*app.get('/data', function(req, res){
	var s = JSON.stringify(req.session);
	req.session.last_visit = Date.now();
	res.writeHeader(200, {"Content-Type" : "text/html"});
	res.write(JSON.stringify(req.cookies) + "<br>\n");
	res.end('last visit' + s);
});

app.post('*', function(req, res){
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {

		res.end(JSON.stringify(files) + "\n");
		
	});
});*/

/*app.post('*', function(req, res){
	var data = JSON.stringify(req.body);
	res.end(JSON.stringify(req.body) + "\n");
});*/

app.listen(8080);