var http = require('http'),
	url = require('url');

function start (route, handle) {
	http.createServer(function(request, response){
		var pathname = url.parse(request.url).pathname;

		console.log('收到'+pathname+'的请求');

		route(handle, pathname, response, request);

	}).listen(8888);

	console.log('服务启动');	
}

exports.start = start;