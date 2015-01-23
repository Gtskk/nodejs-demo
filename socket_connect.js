var net = require('net'),
	async = require('async');

var res = [];
var client = net.connect({
	host: '172.16.13.89',
	port: 9761
}, function(){
	// 打开读写器
	var open = new Buffer('A000000000', 'hex');
	client.write(open);

	setTimeout(function()
	{
		// 关闭读写器
		var close = new Buffer('A100000000', 'hex');
		client.write(close);
	}, 50000000);
});

client.on('data', function(data){
	var dat = data.toString('hex');
	console.log(dat);
	switch(dat)
	{
		case 'a0020000':
			console.log('连接读写器成功');
			// 设置读写器
			var params = {
				frequency_region: 'F501000000',
				speed_mode: 'FA00000000',
				inventory_time: 'B000002710',
				tag_return_mode: 'BE01000000',
				heart_beat: 'ae01000000',
				ants: 'F300180000'
			}
			for(var x in params)
			{
				client.write(new Buffer(params[x], 'hex'));
			}
			break;
		case 'f5020000':
		case 'fa020000':
		case 'b0020000':
		case 'be020000':
		case 'ae020000':
		case 'f3020000':
			res.push(dat);
			break;
		case 'a1020000':
			console.log('关闭读写器成功');
			process.exit(0);
			break;
		default:
			break;
	}
	console.log(res);
});

client.on('end', function() {
  	console.log('断开连接');
});