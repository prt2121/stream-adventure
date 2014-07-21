var spawn = require('child_process').spawn;
var duplexer = require('duplexer');
    
module.exports = function (cmd, args) {
	// spawn the process and return a single stream
        // joining together the stdin and stdout here
	var ps = spawn(cmd, args);
	return duplexer(ps.stdin, ps.stdout);
};
