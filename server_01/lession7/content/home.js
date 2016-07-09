$(function(){
	
	var tmpl = "";
	tdata = {};

	var initPage = function(){
		
		//load template
		$.get('/templates/home.html',function(content){
			tmpl = content;
		});

		// retrieve data
		$.getJSON('/album.json', function(d){
			console.log(d.data);
			$.extend(tdata, d.data);
		});

		// render page in template
		$(document).ajaxStop(function(){
			var final_data = massage(tdata)
			var renderPage = Mustache.to_html(tmpl, final_data);
			$('body').html(renderPage);
		});
	}();
});

function massage(tdata){
	if(tdata.albums && tdata.albums.length > 0)
		tdata.have_albums = true;
	else
		tdata.have_albums = false;

	return tdata;
}