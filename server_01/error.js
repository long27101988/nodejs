try{
	throw new Error('badr');
}catch(e){
	console.log(e.message);
}