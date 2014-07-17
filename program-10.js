var trumpet = require('trumpet');
var through = require('through');
var tr = trumpet();
tr.pipe(process.stdout);
var thr = through(write);
var stream = tr.select('.loud').createStream();
stream.pipe(thr).pipe(stream);

process.stdin.pipe(tr);
function write (buf) { this.queue(buf.toString().toUpperCase()) }