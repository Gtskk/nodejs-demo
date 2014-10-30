var net = require('net'),
	fs = require('fs');
var service = require('./service');

function main(argv){
	// 读取配置文件
	var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
		host = config.host || '127.0.0.1',
		port = config.port || 80;

	// 建立socket服务端
	var socket = net.createServer(function(conn){
		console.log('Socket服务连接成功在%s:%d', host, port);
		conn.on('data', function(data){
			console.log(data.toString());
			var ret = service.process(data.toString());
			console.log(ret);
			conn.write(ret);
		});
		conn.on('end', function(){
			console.log('Socket服务断开');
		});
	}).listen(port, host);
}

main(process.argv.slice(2));