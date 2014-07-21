var duplexer = require('duplexer');
var t = require('through');

module.exports = function (counter) {
	var c = {};
	var writeStream = t(write, end);
        // return a duplex stream to capture countries on the writable side
        // and pass through `counter` on the readable side
	return duplexer(writeStream, counter);
	//Create an object to keep a count of all the countries in the input.

	function write (data) {
		var country = data.country
    		var count = c[country] || 0
		c[country] = count + 1
    	}

	function end() {
	//Once the input ends, call `counter.setCounts()` with your country counts.
		counter.setCounts(c);
	}
};

