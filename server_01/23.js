

setTimeout(function(){
	console.log('Yo Yo Yo');
},1000);

function intersect(callback){
	
	var intersection = [];
	
	var i = 0;
	//for(var i=1; i<=1000; i++){
	function sub_insect(){		
		for(var j=1; j<=10000; j++){
			if((i*j) % 2 == 0){
				intersection.push(i*j);				
			}
		}
		if(i <= 10000){
			i++;
			if(i%1000 == 0) console.log(i);
			setImmediate(sub_insect);				
		}else{
			callback(intersection);
		}
	}
	//}
	sub_insect();
}



intersect(function(result){
	console.log(result.length);
})


// process.nextTick(calback)
//setImmediate(callback)