var http = require('http');
var post_data = 'name=rock&age=18&sex=male';
var options = {
	host: '172.16.13.143',
	port: '8080',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': post_data.length
	}
};
var req = http.request(options, function(res){
	resData = '';
	res.on('data', function(trunk){
		resData += trunk;
		console.log('服务器说：'+resData);
	});
});
req.write(post_data);
req.end();