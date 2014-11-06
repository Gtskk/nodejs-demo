var redis = require('redis');
var r = redis.createClient();

var RfidNodejs = require('./lib/rfid.js');
var rfid = new RfidNodejs();

var config = require('./config.js').config;
var ips = config.getReaderIps();

var funclists = [onLine, workLine, workToOnLine, workToOffLie, onToOffLine, offLine];

function main(){
	for (var i = 0; i < ips.length; i++) {
		var param = {
			host: ips[i],
			port: 9761,
			antInfos: [
				{
					antIndex: 3,
					antPower: 27
				}
			]
		};

		if(rfid.open(param)) {

			for (var j = 0; j < funclists.length; j++) {
				funclists[j]();
			}
			//close the kinect after 5 seconds
			/*setTimeout(function(){
				rfid.close();
				console.log("rfid Closed");
			}, 5000);*/
		}else{
			console.log('连接读写器错误');
		}
	}
}

// 在架处理方法
function onLine(){
	rfid.on('dataGet', function(returnDatas){
		console.log(returnDatas);
		for(var epc in returnDatas){
			var antPort = returnDatas[epc].data.PORT;
			var groupId = getGroupID(ips[i], antPort);
			if(groupId == null)
				return;

			r.hset(groupId, 'on', JSON.stringify(returnDatas[epc]));
		}
	});
}

function workLine(){
	// console.log('workLine');
	var groupIds = r.smembers('GroupIDs');
	for (var i = 0; i < groupIds.length; i++) {
		var groupConfig = groupIds[i] // 获取组配置
	};
}
function workToOnLine(){
	// console.log('workToOnLine');
}
function workToOffLie(){
	// console.log('workToOffLie');
}
function onToOffLine(){
	// console.log('onToOffLine');
}
function offLine(){
	
}

function getGroupID(ip, ant){
	var groupsInfo = config.groupsInfo;
	for (var i = 0; i < groupsInfo.length; i++) {
		var groupInfo = groupsInfo[i];
		for (var j = 0; j < groupInfo.length; j++) {
			var group = groupInfo[j];
			if(ip === group['readerIp'] && group['antId'] === ant)
				return i;
		}
	}

    return null;
}

main();