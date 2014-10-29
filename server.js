var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
	console.log('远程主机地址：'+req.connection.remoteAddress);
	var postData = '';
	req.setEncoding('utf8');
	req.on('data', function(trunk){
		postData += trunk;
		console.log('客户端说：'+postData);
	});
	req.on('end', function(){
		res.end(postData);
	});
}).listen(8080);
console.log('服务器启动完成');