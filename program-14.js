var crypto = require('crypto');
//crypto.createDecipher(algorithm, password)
var stream = crypto.createDecipher('aes256', process.argv[2]);
stream.pipe(process.stdout);
process.stdin.pipe(stream);