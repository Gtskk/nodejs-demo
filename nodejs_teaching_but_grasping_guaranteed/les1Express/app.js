var express = require('express'),
	superagent = require('superagent'),
	cheerio = require('cheerio');

app = express();

app.get('/', function(req, res, next){
	// 用superagent抓取内容
	superagent.get('http://www.yohobuy.com/').end(function(err, sres){
		if(err){
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		$('.new-hot-brand li a').each(function(idx, element){
			items.push({
				img: $(this).find('img').attr('src'),
				href: $(this).attr('href')
			});
		});

		res.send(items);
	});
});

app.listen(3000, function(){
	console.log('监听在端口3000');
});