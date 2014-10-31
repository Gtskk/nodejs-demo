var redis = require('redis');

var r = redis.createClient();

var funclists = [onLine, workLine, workToOnLine, workToOffLie, onToOffLine, offLine];

function main(){
	for (var i = 0; i < funclists.length; i++) {
		setInterval(funclists[i], 1000);
	};
}

// 在架处理方法
function onLine(){
	console.log('onLine');
	var data = r.smembers('DeviceIDs');
	for (var i = 0; i < data.length; i++) {
		var epcs = r.get(data[i]);
		if(epcs == null)
			continue;

		// 去除详细内容
	};
}

function workLine(){
	console.log('workLine');
	var groupIds = r.smembers('GroupIDs');
	for (var i = 0; i < groupIds.length; i++) {
		var groupConfig = groupIds[i] // 获取组配置
	};
}
function workToOnLine(){
	console.log('workToOnLine');
}
function workToOffLie(){
	console.log('workToOffLie');
}
function onToOffLine(){
	console.log('onToOffLine');
}
function offLine(){
	console.log('offLine');
}

console.log('iamgtskk');

main();