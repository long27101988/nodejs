var Greeter = require('./greeter');
var http = require('http');

greeter = new Greeter('en');
console.log(greeter.greet());
/*console.log(greeter.hello('en'));
console.log(greeter.goodbye('jp'));
*/