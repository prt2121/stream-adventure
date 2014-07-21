var combine = require('stream-combiner')
var through = require('through');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
	var genre;
	var tr = through(write, end);	
	function write (line) {
        if (!line.length) return;
        var row = JSON.parse(line);       
        if (row.type === 'genre') {
            if (genre) {
                this.queue(JSON.stringify(genre) + '\n');
            }
            genre = { name: row.name, books: [] };
        } else if (row.type === 'book') {
            genre.books.push(row.name);
        }
    }
    function end () {
        if (genre) {
            this.queue(JSON.stringify(genre) + '\n');
        }
        this.queue(null);
    }
    return combine(
        // read newline-separated json
		split(),
        // group books into genres
		tr,		
        // then gzip the output
		zlib.createGzip()
    )
}