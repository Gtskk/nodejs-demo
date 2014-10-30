var cp = require('child_process')
var worker;

// 守护子进程
function spawn(server, config){
	worker = cp.spawn('node', [server, config]);
	console.log("子进程启动成功！");
	worker.on('exit', function(code){
		if(code != 0){
			spawn(server, config);
		}
	});
}

function main(argv){
	spawn('hello.js', argv[0]);
	process.on('SIGTERM', function(){
		worker.kill();
		process.exit(0);
	});
}


main(process.argv.slice(2));