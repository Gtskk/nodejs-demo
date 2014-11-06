var redis = require('redis');
var config = require('./config.js').config;

// 处理逻辑数据
function process(data){
	try{
		var params = getCommand(data);
		if(params.commandType == 'getTagsList'){
			return getTagsList(params.commandType, params.groupId, params.state);
		}
	}catch(err){
		console.log('错误：%s', err.message);
	}
}

// 读取命令结果
function getCommand(data) {
	data = JSON.parse(data);
	var params = {};
	params.commandType = data.commandType;
	if('groupId' in data){
		params.groupId = data.groupId;
	}

	if('state' in data){
		var state = data.state;
		if(state == 'shelfOn'){
            state = 'on'
        }else if(state == 'shelfOff'){
            state = 'work'
        }else if(state == 'shelfOnAndOff'){
            state = 'onAndWork'
        }else{
            state = 'off'
        }
        params.state = state
	}

	return params;
}


// 获取标签列表
function getTagsList(ct, groupId, state){
	var r = redis.createClient();
	r.on('error', function(err) {
		console.error('Redis错误：'+err);
	});
	
	var states = [];
	var datas = [];
	var epcs = null;
	var groupConfig = config.getGroupsConfig(groupId);
	
	if(state == 'onAndWork'){
		states.push('on');
		states.push('work');
	}else{
		states.push(state);
	}

	for (var i = 0; i < states.length; i++) {
		epcs = r.hget(groupId, state);

		if(epcs == null)
			continue;
		epcs = JSON.parse(epcs);

		for(var tag in epcs){
			// 抓取信息

			console.log('groupId:%s ------- %s----%s', groupId, tag.data.EPC, tag.time);

			datas.push(tag.data.EPC);
		}
	}

	return output(ct, 'success', datas);
}


function output (commandType, code, data) {
	res = {
		commandType: commandType,
		code: code,
		data: data
	};
	return JSON.stringify(res);
}


exports.process = process;