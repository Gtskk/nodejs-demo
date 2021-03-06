var fs = require('fs'), 
	path = require('path'),
	http = require('http');

var worker;

var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};

function combineFiles(pathnames, callback){
	var output = [];

	(function next(i, len){
		if(i < len){
			// 依次读取
			fs.stat(pathnames[i], function(err, stats){
				if(err){
					callback(err);
				}else if(!stats.isFile()){
					callback(new Error());
				}else{
					next(i+1, len);
				}
			})
		}else{
			callback(null, pathnames);
		}
	}(0, pathnames.length));
}

function outputFiles(pathnames, writer){
	(function next(i, len){
		if(i < len){
			var reader = fs.createReadStream(pathnames[i]);

			reader.pipe(writer, {end: false});
			reader.on('end', function(){
				next(i+1, len);
			});
		}else{
			writer.end();
		}
	})(0, pathnames.length);
}

function main(argv){

	var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
		root = config.root || '.',
		port = config.port || 80;

	var server = http.createServer(function(request, response){

		var urlInfo = parseURL(root, request.url);

		combineFiles(urlInfo.pathnames, function(err, pathnames){
			if(err){
				response.writeHead(400);
				response.end(err.message);
			}else{
				response.writeHead(200, {
					'Content-Type': urlInfo.mime
				});
				outputFiles(pathnames, response);
			}
		});
	}).listen(port);

	process.on('SIGTERM', function(){
		server.close(function(){
			process.exit(0);
		});
	});
}

function parseURL(root, url){
	var base, pathnames, parts;

	if(url.indexOf('??') == -1){
		url = url.replace('/', '/??');
	}

	parts = url.split('??');
	base = parts[0];
	pathnames = parts[1].split(',').map(function(val){
		return path.join(root, base, val);
	});

	return {
		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	}
}

// console.log(parseURL('.', 'http://assets.example.com/foo/??bar.css,baz.js'));
main(process.argv.slice(2));