var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('formidable');

function start(response)
{
	console.log('start函数执行');

	/*
	模拟等待
	function sleep(miles)
	{
		var starttime = new Date().getTime();
		while(new Date().getTime() < starttime + miles);
	}

	sleep(10000);*/

	var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<br />'+
        '<input type="submit" value="上传文件" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead('200', {
    	"Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request)
{
	console.log('upload函数执行');

	var form = new formidable.IncomingForm();
	form.uploadDir = 'D:\\';

	form.parse(request, function(err, fields, files){
		console.log('解析完毕');
		// 修复直接访问/upload不正确的问题
		if(Object.getOwnPropertyNames(files).length){
			fs.renameSync(files.upload.path, 'D:\\test.png');
		}
		response.writeHead('200', {"Content-Type": "text/html"});
	    response.write('<img src="/show" />');
	    response.end();
	});
}

function show (response, postData) 
{
	console.log('show函数执行');
	fs.readFile('D:\\test.png', 'binary', function(err, file){
		if(err)
		{
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(err+"\n");
			response.end();
		}
		else
		{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, 'binary');
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;