var http = require('http');

http.createServer(function(req, res){
	console.log('new request');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World');
}).listen(5000);

var wait = function(mils) {
	var now = new Date;
	while(new Date - now <= mils);
}

function connect(){
	var req = http.request({
		host: 'localhost',
		port: 5000,
		path: '/',
		method: 'GET'
	}, function(res){
		res.setEncoding('utf8');
		res.on('data', function(data){
			console.log(data);
		});
	});
	
	req.on('error', function(e) {
		console.log('problem with request: '+e.message);
	});
	req.end();
}

function compute(){
	console.log('Start computing');

	connect();
	
	wait(1000);
	console.log('waiting 1s for next click.');
  /*
   *因为process.maxTickDepth()的缺省值是1000，如果超过会报exceed callback stack。官方认为在递归中用process.nextTick会造成饥饿event 
   *loop，因为nextTick没有给其他异步事件执行的机会，递归中推荐用setImmediate
   * To schedule the "immediate" execution of callback after I/O events callbacks and before setTimeout and setInterval .
   * Use setImmediate if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use process.
   * nextTick to effectively queue the function at the head of the event queue so that it executes immediately after the current function 
   * completes.So in a case where you're trying to break up a long running, CPU-bound job using recursion, you would now want to use 
   * setImmediate rather than process.nextTick to queue the next iteration as otherwise any I/O event callbacks wouldn't get the chance to 
   * run between iterations.
   */
  process.nextTick(compute); // 使用process.nextTick()则connect()不会执行
	// setImmediate(compute);  // 使用setImmediate()则connect()执行，切比setTimeout执行快
	// setTimeout(compute, 1000); // 使用setTimeout()则connect()执行
}

compute();