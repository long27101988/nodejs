function Shape(){}

Shape.prototype.X = 0;

Shape.prototype.Y = 0; 

Shape.prototype.move = function(x, y){
	this.X = x;
	this.Y = y;
}	

Shape.prototype.distance_from = function(){
	return Math.sqrt(this.X*this.X + this.Y*this.Y);
}

var shape = new Shape();
shape.move(5,4);
var kq = shape.distance_from();
//console.log(kq);

function Square(){}
Square.prototype = new Shape();
Square.prototype.__proto__ = Shape.prototype;
Square.prototype.With = 0;
Square.prototype.area = function(){
	return this.With*this.With;
}

var sq = new Square();
sq.move(5,4);
var kq1 = sq.distance_from();
sq.With = 5;
var kq2 = sq.area();
console.log(kq1, kq2);