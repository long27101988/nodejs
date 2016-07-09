function Greeter(lang){
	this.language = lang;

	this.greet = function(){
		if(this.language == "en")
			return "Hello world";
		else if(this.language == "jp")
			return "oh hi oh oh zai shi mask";
		else 
			return "i can not speak this language";
	}
}


module.exports = Greeter;