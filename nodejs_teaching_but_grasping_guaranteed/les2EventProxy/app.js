var superagent = require('superagent'),
	eventproxy = require('eventproxy'),
	cheerio = require('cheerio'),
	url = require('url'),
	express = require('express');

var cnodeUrl = 'https://cnodejs.org';

var app = express();
app.listen(process.env.PORT || 5000);
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

		var ep = new eventproxy();
		ep.after('topic_html', topicUrls.length, function(topics){
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


			ep.after('user_html', userUrls.length, function(users){
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

			userUrls.forEach(function(userUrl){
				if(userUrl != ''){
					superagent.get(userUrl).end(function(uerr, ures){
						if(err){
							return console.error(uerr);
						}
						// console.log('获取用户'+userUrl+'成功');
						ep.emit('user_html', ures.text);
					});
				}else{
					ep.emit('user_html', '');
				}
			});
		});

		topicUrls.forEach(function(topicUrl){
			superagent.get(topicUrl).end(function(err, ssres){
				if(err){
					return console.error(err);
				}
				// console.log('查询'+topicUrl+'成功');
				ep.emit('topic_html', [topicUrl, ssres.text]);
			});
		});
	});
});/*
app.listen(3000, function(){
	console.log('监听在3000端口');
});*/