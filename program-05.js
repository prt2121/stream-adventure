var through = require('through');
var split = require('split');

function transform () {
  var lower = true;

  return through(
    function write (line) {            
	this.queue((lower ? line.toString().toLowerCase() : line.toString().toUpperCase()) + '\n');
	lower = !lower;
    });
}

process.stdin.pipe(split()).pipe(transform()).pipe(process.stdout);
