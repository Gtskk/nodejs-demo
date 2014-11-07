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
				funclists[j](ips[i]);
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
function onLine(ip){
	rfid.on('dataGet', function(returnDatas){
		console.log(returnDatas);
		for(var epc in returnDatas){
			var antPort = returnDatas[epc].data.PORT;
			var groupId = getGroupId(ip, antPort);
			if(groupId == null)
				return;

			var onEpcs = null;
			r.hget(groupId, 'on', function(err, obj){
				onEpcs = obj;
			});
			if(onEpcs)
				onEpcs = JSON.parse(onEpcs);
			else
				onEpcs = {};
			onEpcs[epc] = returnDatas[epc];

			r.hset(groupId, 'on', JSON.stringify(onEpcs));
		}
	});
}

function workLine(ip){
	rfid.on('workDataGet', function(returnDatas){
		console.log(returnDatas);
		for(var epc in returnDatas){
			var antPort = returnDatas[epc].data.PORT;
			var groupId = getGroupId(ip, antPort);
			if(groupId == null)
				return;

			var onEpcs = null;
			r.hget(groupId, 'on', function(err, obj){
				onEpcs = obj;
			});
			if(onEpcs)
				onEpcs = JSON.parse(onEpcs);
			else
				onEpcs = {};
			onEpcs[epc] = returnDatas[epc];

			r.hset(groupId, 'on', JSON.stringify(onEpcs));
		}
	});
}
function workToOnLine(ip){
	// console.log('workToOnLine');
}
function workToOffLie(ip){
	// console.log('workToOffLie');
}
function onToOffLine(ip){
	// console.log('onToOffLine');
}
function offLine(ip){
	
}

function getGroupId(ip, ant){
	var groupsInfo = config.groupsInfo;
	for (var i in groupsInfo) {
		var groupInfo = groupsInfo[i];
		for (var j = 0; j < groupInfo.length; j++) {
			var group = groupInfo[j];
			if(ip === group.readerIp && group.antId === ant)
				return i;
		}
	}

    return null;
}

main();