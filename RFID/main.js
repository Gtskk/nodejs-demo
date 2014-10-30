var cp = require('child_process'),
	http = require('http');

var processlists = ['socket', 'monitor', 'scan', 'tagCheck'];
var processrun = [];

//守护进程函数
function spawn(service, config){
	var child;
	if (config != undefined) {
		child = cp.spawn('node', [service, config]);
	}else{
		child = cp.spawn('node', [service]);
	}

	processrun.push(child);

	child.on('exit', function(code){
		if(code != 0){
			spawn(service, config);
		}
	});
}

// 程序主函数
function main(argv){
	for (var i = 0; i < processlists.length; i++) {
		if(processlists[i] == 'socket'){
			spawn(processlists[i], argv[0]);
		}else{
			spawn(processlists[i]);
		}
	}

	process.on('SIGTERM', function(){
		for (var j = 0; j < processrun.length; j++) {
			processrun[j].kill();
		}
		process.exit(0);
	});
}

main(process.argv.slice(2));