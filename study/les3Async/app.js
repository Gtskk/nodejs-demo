/*var async = require('async');

var urls = [];
for (var i = 0; i < 30; i++) {
	urls.push('http://datasource_'+i);
}

var cocurrencyCount = 0;
var fetchUrl = function(url, callback){
	var delay = parseInt((Math.random() * 10000000)%2000, 10);
	cocurrencyCount++;
	console.log('现在的并发数是'+cocurrencyCount, ', 正在抓取的是'+url, ', 耗时'+delay);
	setTimeout(function(){
		cocurrencyCount--;
		callback(null, url+' html content');
	}, delay);
}

async.mapLimit(urls, 5, function(url, callback){
	fetchUrl(url, callback);
}, function(err, result){
	if(err){
		console.error(err);
	}
	console.log('final: ');
	console.log(result);
});*/
var superagent = require('superagent'),
	async = require('async'),
	cheerio = require('cheerio'),
	url = require('url'),
	express = require('express');

var cnodeUrl = 'https://cnodejs.org';

var app = express();
app.get('/', function(req, res){
	superagent.get(cnodeUrl).end(function(err, sres){
		if(err){
			return console.error(err);
		}
		var $ = cheerio.load(sres.text);
		var topicUrls = [];
		$('#topic_list .topic_title').each(function(idx, element){
			var href = url.resolve(cnodeUrl, $(this).attr('href'));
			topicUrls.push(href);
		});

		// console.log(topicUrls);

		async.mapLimit(topicUrls, 5, function(topicUrl, callback){
			superagent.get(topicUrl).end(function(err, ssres){
				if(err){
					return console.error(err);
				}
				// console.log('查询'+topicUrl+'成功');
				callback(null, [topicUrl, ssres.text]);
			});
		},function(err, topics){
			var userUrls = [];
			topics.forEach(function(topic){
				var $ = cheerio.load(topic[1]);
				var $url = $('.author_content').eq(0).find('a').first().attr('href');
				var userUrl = '';
				if($url != undefined){
					var userUrl = url.resolve(cnodeUrl, $url);
				}
				userUrls.push(userUrl);
			});

			async.mapLimit(userUrls, 5, function(userUrl, callback){
				if(userUrl != ''){
					superagent.get(userUrl).end(function(uerr, ures){
						if(err){
							return console.error(uerr);
						}
						// console.log('获取用户'+userUrl+'成功');
						callback(null, ures.text);
					});
				}else{
					callback(null, '');
				}
			}, function(err, users){
				var userScores = [];
				users.forEach(function(user) {
					var userScore = '';
					if(user != ''){
						var $ = cheerio.load(user);
						userScore = $('.user_profile .big').text().trim();
					}
					userScores.push(userScore);
				});
				topics = topics.map(function(topicPair, index){
					var topicUrl = topicPair[0];
					var topicHtml = topicPair[1];
					var $ = cheerio.load(topicHtml);
					var author = $('.author_content').eq(0).find('img').first().attr('title');

					return ({
						title: $('.topic_full_title').text().trim(),
						href: topicUrl,
						comment1: $('.reply_content').eq(0).text().trim(),
						author1: author,
						score1: userScores[index]
					});
				});
				res.send(topics);
			});
		});
	});
});
app.listen(3000, function(){
	console.log('监听在3000端口');
});