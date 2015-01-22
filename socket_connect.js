var net = require('net');

var command = {
	CommandType: 'GetTagsList',
	Key: '123456',
	GroupID: 8,
	State: 'shelfOn'
};

var client = net.connect({
	host: '172.16.13.34',
	port: 12345
}, function(){
	setInterval(function(){
		client.write(JSON.stringify(command));
	}, 1000);
});

client.on('data', function(data){
	console.log(data.toString());
});