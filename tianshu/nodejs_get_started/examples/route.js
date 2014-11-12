function route(handle, pathname, response, request)
{
	if(typeof(handle[pathname]) === 'function')
	{
		handle[pathname](response, request);
	}
	else
	{
		response.writeHead('400', {
			"Content-type": "text/plain"
		});
		response.write('页面未找到');
		response.end();
	}
}

exports.route = route;