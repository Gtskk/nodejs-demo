var net = require('net');

var command = {
	commandType: 'getTagsList',
	key: '123456',
	groupId: 8,
	state: 'shelfOn'
};

var client = net.connect({
	host: '127.0.0.1',
	port: 12345
}, function(){
	setInterval(function(){
		client.write(JSON.stringify(command));
	}, 1000);
});

client.on('data', function(data){
	console.log(data.toString());
});