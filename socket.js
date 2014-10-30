var net = require('net');

var socket = net.createServer(function(conn){
	conn.on('data', function(data){
		console.log(data.toString());
		conn.write([
			'HTTP/1.1 200 OK',
			'Content-Type: text/plain',
			'Content-Length: 11',
			'',
			'Hello Gtskk'
		].join('\n'));
	});
}).listen(8080);