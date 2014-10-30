function async(fn, callback){
	setTimeout(function(){
		callback(null, fn());
	});
}

/*async(null, function(err, data){
	if(err){
		console.log('Error: %s', err.message);
	}
});

process.on('uncaughtException', function(err){
	console.log('Error:%s', err.message);
});*/

var domain = require('domain');
var d = domain.create();
d.on('error', function(){
	console.log('Error');
});

d.run(function(){
	async(null, function(err, data){
		if(err){
			console.log('Error: %s', err.message);
		}
	});
});


/*陷阱

无论是通过process对象的uncaughtException事件捕获到全局异常，还是通过子域对象的error事件捕获到了子域异常，在NodeJS官方文档里都强烈建议处理完异常后立即重启程序，而不是让程序继续运行。按照官方文档的说法，发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重内存泄漏，也可能表现得很奇怪。

但这里需要澄清一些事实。JS本身的throw..try..catch异常处理机制并不会导致内存泄漏，也不会让程序的执行结果出乎意料，但NodeJS并不是存粹的JS。NodeJS里大量的API内部是用C/C++实现的，因此NodeJS程序的运行过程中，代码执行路径穿梭于JS引擎内部和外部，而JS的异常抛出机制可能会打断正常的代码执行流程，导致C/C++部分的代码表现异常，进而导致内存泄漏等问题。

因此，使用uncaughtException或domain捕获异常，代码执行路径里涉及到了C/C++部分的代码时，如果不能确定是否会导致内存泄漏等问题，最好在处理完异常后重启程序比较妥当。而使用try语句捕获异常时一般捕获到的都是JS本身的异常，不用担心上诉问题。
*/