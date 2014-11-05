var edge = require('edge'), 
	path = require('path'),
	redis = require('redis');

var config = require('../config.js').config,
	defines = require('../define.js').defines;

var r = redis.createClient();
var ips = config.getReaderIps();

var params = {
	host: 'COM3',
	port: '12345'
};
var rfid = edge.func({
	source: path.join(__dirname, 'rfid.csx'),
	references: [path.join(__dirname, 'JW.UHF.dll')]
});

function main() {
	for (var i = 0; i < ips.length; i++) {
		var param = {
			host: ips[i],
			port: 9761
		};
		console.log(param);
		rfid(param, function(err, result){
			if(err) throw err;
		    // 将读取到的信息保存到内存数据库中
		    if(result){
		    	console.log(result);
		    	// r.set('DeviceID', JSON.stringify(result));
		    }else{
		    	console.log('读取读写器错误');
		    }
		});
	}
}

main();