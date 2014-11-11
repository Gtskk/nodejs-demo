关于
----------------------

本书致力于教会你如何用Node.js来开发应用，过程中会传授你所有所需的“高级”JavaScript知识。本书绝不是一本“Hello World”的教程。

### 状态

你正在阅读的已经是本书的最终版。因此，只有当进行错误更正以及针对新版本Node.js的改动进行对应的修正时，才会进行更新。

本书中的代码案例都在Node.js 0.6.11版本中测试过，可以正确工作。

### 读者对象

本书最适合与我有相似技术背景的读者： 至少对一门诸如Ruby、Python、PHP或者Java这样面向对象的语言有一定的经验；对JavaScript处于初学阶段，并且完全是一个Node.js的新手。

这里指的适合对其他编程语言有一定经验的开发者，意思是说，本书不会对诸如数据类型、变量、控制结构等等之类非常基础的概念作介绍。要读懂本书，这些基础的概念我都默认你已经会了。

然而，本书还是会对JavaScript中的函数和对象作详细介绍，因为它们与其他同类编程语言中的函数和对象有很大的不同。

### 本书结构

读完本书之后，你将完成一个完整的web应用，该应用允许用户浏览页面以及上传文件。

当然了，应用本身并没有什么了不起的，相比为了实现该功能书写的代码本身，我们更关注的是如何创建一个框架来对我们应用的不同模块进行干净地剥离。 是不是很玄乎？稍后你就明白了。

本书先从介绍在Node.js环境中进行JavaScript开发和在浏览器环境中进行JavaScript开发的差异开始。

紧接着，会带领大家完成一个最传统的“Hello World”应用，这也是最基础的Node.js应用。

最后，会和大家讨论如何设计一个“真正”完整的应用，剖析要完成该应用需要实现的不同模块，并一步一步介绍如何来实现这些模块。

可以确保的是，在这过程中，大家会学到JavaScript中一些高级的概念、如何使用它们以及为什么使用这些概念就可以实现而其他编程语言中同类的概念就无法实现。

该应用所有的源代码都可以通过[本书Github代码仓库](https://github.com/ManuelKiessling/NodeBeginnerBook/tree/master/code/application).

Javascript与Nodejs
----------------------

### Javascript与你

抛开技术，我们先来聊聊你以及你和JavaScript的关系。本章的主要目的是想让你看看，对你而言是否有必要继续阅读后续章节的内容。

如果你和我一样，那么你很早就开始利用HTML进行“开发”，正因如此，你接触到了这个叫JavaScript有趣的东西，而对于JavaScript，你只会基本的操作——为web页面添加交互。

而你真正想要的是“干货”，你想要知道如何构建复杂的web站点 —— 于是，你学习了一种诸如PHP、Ruby、Java这样的编程语言，并开始书写“后端”代码。

与此同时，你还始终关注着JavaScript，随着通过一些对jQuery，Prototype之类技术的介绍，你慢慢了解到了很多JavaScript中的进阶技能，同时也感受到了JavaScript绝非仅仅是window.open() 那么简单。 .

不过，这些毕竟都是前端技术，尽管当想要增强页面的时候，使用jQuery总让你觉得很爽，但到最后，你顶多是个JavaScript用户，而非JavaScript开发者。

然后，出现了Node.js，服务端的JavaScript，这有多酷啊？

于是，你觉得是时候该重新拾起既熟悉又陌生的JavaScript了。但是别急，写Node.js应用是一件事情；理解为什么它们要以它们书写的这种方式来书写则意味着——你要懂JavaScript。这次是玩真的了。

问题来了： 由于JavaScript真正意义上以两种，甚至可以说是三种形态存在（从中世纪90年代的作为对DHTML进行增强的小玩具，到像jQuery那样严格意义上的前端技术，一直到现在的服务端技术），因此，很难找到一个“正确”的方式来学习JavaScript，使得让你书写Node.js应用的时候感觉自己是在真正开发它而不仅仅是使用它。

因为这就是关键： 你本身已经是个有经验的开发者，你不想通过到处寻找各种解决方案（其中可能还有不正确的）来学习新的技术，你要确保自己是通过正确的方式来学习这项技术。

当然了，外面不乏很优秀的学习JavaScript的文章。但是，有的时候光靠那些文章是远远不够的。你需要的是指导。

本书的目标就是给你提供指导。

### 简短申明

业界有非常优秀的JavaScript程序员。而我并非其中一员。

我就是上一节中描述的那个我。我熟悉如何开发后端web应用，但是对“真正”的JavaScript以及Node.js，我都只是新手。我也只是最近学习了一些JavaScript的高级概念，并没有实践经验。

因此，本书并不是一本“从入门到精通”的书，更像是一本“从初级入门到高级入门”的书。

如果成功的话，那么本书就是我当初开始学习Node.js最希望拥有的教程。

### 服务端Javascript

JavaScript最早是运行在浏览器中，然而浏览器只是提供了一个上下文，它定义了使用JavaScript可以做什么，但并没有“说”太多关于JavaScript语言本身可以做什么。事实上，JavaScript是一门“完整”的语言： 它可以使用在不同的上下文中，其能力与其他同类语言相比有过之而无不及。

Node.js事实上就是另外一种上下文，它允许在后端（脱离浏览器环境）运行JavaScript代码。

要实现在后台运行JavaScript代码，代码需要先被解释然后正确的执行。Node.js的原理正是如此，它使用了Google的V8虚拟机（Google的Chrome浏览器使用的JavaScript执行环境），来解释和执行JavaScript代码。

除此之外，伴随着Node.js的还有许多有用的模块，它们可以简化很多重复的劳作，比如向终端输出字符串。

因此，Node.js事实上既是一个运行时环境，同时又是一个库。

要使用Node.js,首先需要进行安装。关于如何安装Node.js，这里就不赘述了，可以直接参考[官方安装指南](https://github.com/joyent/node/wiki/Installation)。安装完成后， 继续回来阅读本书下面的内容。

### "Hello World"

好了，“废话”不多说了，马上开始我们第一个Node.js应用：`Hello World`。

打开你最喜欢的编辑器，创建一个`helloworld.js`文件。我们要做就是向STDOUT输出`Hello World`，如下是实现该功能的代码：

	console.log("Hello World");

保存该文件，并通过`node helloworld.js`执行。

正常的话，就会在终端输出`Hello World`。

好吧，我承认这个应用是有点无趣，那么下面我们就来点“干货”。

一个完整的基于Node.js的web应用
------------------------------

### 用例

我们来把目标设定得简单点，不过也要够实际才行：

* 用户可以通过浏览器使用我们的应用。
* 当用户请求`http://domain/start`时，可以看到一个欢迎页面，页面上有一个文件上传的表单。
* 用户可以选择一个图片并提交表单，随后文件将被上传到`http://domain/upload`，该页面完成上传后会把图片显示在页面上。

差不多了，你现在也可以去Google一下，找点东西乱搞一下来完成功能。但是我们现在先不做这个。

更进一步地说，在完成这一目标的过程中，我们不仅仅需要基础的代码而不管代码是否优雅。我们还要对此进行抽象，来寻找一种适合构建更为复杂的Node.js应用的方式。

### 应用不同模块的分析

我们来分解一下这个应用，为了实现上文的用例，我们需要实现哪些部分呢？

* 我们需要提供Web页面，因此需要一个HTTP服务器
* 对于不同的请求，根据请求的URL，我们的服务器需要给予不同的响应，因此我们需要一个路由，用于把请求对应到请求处理程序（request handler）
* 当请求被服务器接收并通过路由传递之后，需要可以对其进行处理，因此我们需要最终的请求处理程序
* 路由还应该能处理POST数据，并且把数据封装成更友好的格式传递给请求处理入程序，因此需要请求数据处理功能
* 我们不仅仅要处理URL对应的请求，还要把内容显示出来，这意味着我们需要一些视图逻辑供请求处理程序使用，以便将内容发送给用户的浏览器
* 最后，用户需要上传图片，所以我们需要上传处理功能来处理这方面的细节

我们先来想想，使用PHP的话我们会怎么构建这个结构。一般来说我们会用一个Apache HTTP服务器并配上mod_php5模块。
从这个角度看，整个“接收HTTP请求并提供Web页面”的需求根本不需要PHP来处理。

不过对Node.js来说，概念完全不一样了。使用Node.js时，我们不仅
仅在实现一个应用，同时还实现了整个HTTP服务器。事实上，我们的Web应用以及对应的Web服务器基本上是一样的。

听起来好像有一大堆活要做，但随后我们会逐渐意识到，对Node.js来说这并不是什么麻烦的事。

现在我们就来开始实现之路，先从第一个部分--HTTP服务器着手。


构建应用的模块
--------------------

### 一个基础的HTTP服务器

当我准备开始写我的第一个“真正的”Node.js应用的时候，我不但不知道怎么写Node.js代码，也不知道怎么组织这些代码。 
我应该把所有东西都放进一个文件里吗？网上有很多教程都会教你把所有的逻辑都放进一个用Node.js写的基础HTTP服务器里。但是如果我想加入更多的内容，同时还想保持代码的可读性呢？

实际上，只要把不同功能的代码放入不同的模块中，保持代码分离还是相当简单的。

这种方法允许你拥有一个干净的主文件（main file），你可以用Node.js执行它；同时你可以拥有干净的模块，它们可以被主文件和其他的模块调用。

那么，现在我们来创建一个用于启动我们的应用的主文件，和一个保存着我们的HTTP服务器代码的模块。

在我的印象里，把主文件叫做`index.js`或多或少是个标准格式。把服务器模块放进叫`server.js`的文件里则很好理解。

让我们先从服务器模块开始。在你的项目的根目录下创建一个叫`server.js`的文件，并写入以下代码：

	var http = require("http");

	http.createServer(function(request, response) {
  		response.writeHead(200, {"Content-Type": "text/plain"});
  		response.write("Hello World");
  		response.end();
	}).listen(8888);

搞定！你刚刚完成了一个可以工作的HTTP服务器。为了证明这一点，我们来运行并且测试这段代码。首先，用`node server.js`执行你的脚本。

接下来，打开浏览器访问[服务器地址](http://localhost:8888/)，你会看到一个写着`Hello World`的网页。

这很有趣，不是吗？让我们先来谈谈HTTP服务器的问题，把如何组织项目的事情先放一边吧，你觉得如何？我保证之后我们会解决那个问题的。

### 分析HTTP服务器

那么接下来，让我们分析一下这个HTTP服务器的构成。

第一行请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。

接下来我们调用http模块提供的函数： createServer 。这个函数会返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个HTTP服务器监听的端口号。

咱们暂时先不管 http.createServer 的括号里的那个函数定义。

我们本来可以用这样的代码来启动服务器并侦听8888端口：
	
	var http = require("http");

	var server = http.createServer();
	server.listen(8888);

这段代码只会启动一个侦听8888端口的服务器，它不做任何别的事情，甚至连请求都不会应答。

最有趣（而且，如果你之前习惯使用一个更加保守的语言，比如PHP，它还很奇怪）的部分是 createSever() 的第一个参数，一个函数定义。

实际上，这个函数定义是 createServer() 的第一个也是唯一一个参数。因为在JavaScript中，函数和其他变量一样都是可以被传递的。

### 进行函数传递

举例来说，你可以这样做：

	function say(word) {
	  	console.log(word);
	}

	function execute(someFunction, value) {
	  	someFunction(value);
	}

	execute(say, "Hello");

请仔细阅读这段代码！在这里，我们把 say 函数作为execute函数的第一个变量进行了传递。这里返回的不是 say 的返回值，而是 say 本身！

这样一来， say 就变成了execute 中的本地变量 someFunction ，execute可以通过调用 someFunction() （带括号的形式）来使用 say 函数。

当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。

我们可以，就像刚才那样，用它的名字把一个函数作为变量传递。但是我们不一定要绕这个“先定义，再传递”的圈子，我们可以直接在另一个函
数的括号中定义和传递这个函数：

	function execute(someFunction, value) {
	  	someFunction(value);
	}

	execute(function(word){ console.log(word) }, "Hello");

我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。

用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做 匿名函数 。

这是我们和我所认为的“进阶”JavaScript的第一次亲密接触，不过我们还是得循序渐进。现在，我们先接受这一点：在JavaScript中，一个函数
可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。

### 函数传递是如何让HTTP服务器工作的

带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：

	var http = require("http");

	http.createServer(function(request, response) {
	  	response.writeHead(200, {"Content-Type": "text/plain"});
	  	response.write("Hello World");
	  	response.end();
	}).listen(8888);


现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。

用这样的代码也可以达到同样的目的：
	
	var http = require("http");

	function onRequest(request, response) {
	  	response.writeHead(200, {"Content-Type": "text/plain"});
	  	response.write("Hello World");
	  	response.end();
	}

	http.createServer(onRequest).listen(8888);

也许现在我们该问这个问题了：我们为什么要用这种方式呢？

### 基于事件驱动的回调

这个问题可不好回答（至少对我来说），不过这是Node.js原生的工作方式。它是事件驱动的，这也是它为什么这么快的原因。

你也许会想花点时间读一下*Felix Geisendörfer*的大
作[Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)，它
介绍了一些背景知识。

这一切都归结于“Node.js是事件驱动的”这一事实。好吧，其实我也不是特别确切的了解这句话的意思。不过我会试着解释，为什
么它对我们用Node.js写网络应用（Web based application）是有意义的。

当我们使用 http.createServer 方法的时候，我们当然不只是想要一个侦听某个端口的服务器，我们还想要它在服务器收到一个
HTTP请求的时候做点什么。

问题是，这是异步的：请求任何时候都可能到达，但是我们的服务器却跑在一个单进程中。

写PHP应用的时候，我们一点也不为此担心：任何时候当有请求进入的时候，网页服务器（通常是Apache）就为这一请求新建一个进
程，并且开始从头到尾执行相应的PHP脚本。

那么在我们的Node.js程序中，当一个新的请求到达8888端口的时候，我们怎么控制流程呢？

嗯，这就是Node.js/JavaScript的事件驱动设计能够真正帮上忙的地方了——虽然我们还得学一些新概念才能掌握它。让我们来看看这
些概念是怎么应用在我们的服务器代码里的。

我们创建了服务器，并且向创建它的方法传递了一个函数。无论何时我们的服务器收到一个请求，这个函数就会被调用。

我们不知道这件事情什么时候会发生，但是我们现在有了一个处理请求的地方：它就是我们传递过去的那个函数。至于它是被预先定
义的函数还是匿名函数，就无关紧要了。

这个就是传说中的**回调**。我们给某个方法传递了一个函数，这个方法在有相应事件发生时调用这个函数来进行**回调**。

至少对我来说，需要一些功夫才能弄懂它。你如果还是不太确定的话就再去读读Felix的博客文章。

让我们再来琢磨琢磨这个新概念。我们怎么证明，在创建完服务器之后，即使没有HTTP请求进来、我们的回调函数也没有被调用的情
况下，我们的代码还继续有效呢？我们试试这个：

	var http = require("http");

	function onRequest(request, response) {
	  	console.log("Request received.");
	  	response.writeHead(200, {"Content-Type": "text/plain"});
	  	response.write("Hello World");
	  	response.end();
	}

	http.createServer(onRequest).listen(8888);

	console.log("Server has started.");

> 注意：在 onRequest （我们的回调函数）触发的地方，我用`console.log`输出了一段文本。在HTTP服务器开始工作之后，也输出一
段文本。

当我们与往常一样，运行它`node server.js`时，它会马上在命令行上输出`Server has started.`。当我们向服务器
发出请求（在浏览器访问[http://localhost:8888/](http://localhost:8888/) ），“Request received.”这条消息就会在命令行中出现。

这就是事件驱动的异步服务器端JavaScript和它的回调啦！

>（请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。那是因为大部分服务器都会在你访
问[http://localhost:8888](http://localhost:8888) /时尝试读取 http://localhost:8888/favicon.ico )





Linux系统下没有现成的安装程序可用，虽然一些发行版可以使用`apt-get`之类的方式安装，但不一定能安装到最新版。因此Linux系统下一般使用以下方式编译方式安装NodeJS。

1. 确保系统下g++版本在4.6以上，python版本在2.6以上。

2. 从[nodejs.org](http://nodejs.org/download/)下载`tar.gz`后缀的NodeJS最新版源代码包并解压到某个位置。

3. 进入解压到的目录，使用以下命令编译和安装。

		$ ./configure
		$ make
		$ sudo make install

### 如何运行

打开终端，键入`node`进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

	$ node
	> console.log('Hello World!');
	Hello World!

如果要运行一大段代码的话，可以先写一个JS文件再运行。例如有以下`hello.js`。

	function hello() {
		console.log('Hello World!');
	}
	hello();

写好后在终端下键入`node hello.js`运行，结果如下：

	$ node hello.js
	Hello World!

#### 权限问题

在Linux系统下，使用NodeJS监听80或443端口提供HTTP(S)服务时需要root权限，有两种方式可以做到。

一种方式是使用`sudo`命令运行NodeJS。例如通过以下命令运行的`server.js`中有权限使用80和443端口。一般推荐这种方式，可以保证仅为有需要的JS脚本提供root权限。

	$ sudo node server.js

另一种方式是使用`chmod +s`命令让NodeJS总是以root权限运行，具体做法如下。因为这种方式让任何JS脚本都有了root权限，不太安全，因此在需要很考虑安全的系统下不推荐使用。

	$ sudo chown root /usr/local/bin/node
	$ sudo chmod +s /usr/local/bin/node

### 模块

编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

#### require

`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以`./`开头），或者是绝对路径（以`/`或`C:`之类的盘符开头）。另外，模块名中的`.js`扩展名可以省略。以下是一个例子。

	var foo1 = require('./foo');
	var foo2 = require('./foo.js');
	var foo3 = require('/home/user/foo');
	var foo4 = require('/home/user/foo.js');
	
	// foo1至foo4中保存的是同一个模块的导出对象。

另外，可以使用以下方式加载和使用一个JSON文件。

	var data = require('./data.json');

#### exports

`exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。以下例子中导出了一个公有方法。

	exports.hello = function () {
		console.log('Hello World!');
	};

#### module

通过`module`对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

	module.exports = function () {
		console.log('Hello World!');
	};

以上代码中，模块默认导出对象被替换为一个函数。

#### 模块初始化

一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

#### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，`main.js`就是主模块。

	$ node main.js

#### 完整示例

例如有以下目录。

	- /home/user/hello/
		- util/
			counter.js
		main.js

其中`counter.js`内容如下：

	var i = 0;

	function count() {
		return ++i;
	}

	exports.count = count;

该模块内部定义了一个私有变量`i`，并在`exports`对象导出了一个公有方法`count`。

主模块`main.js`内容如下：

	var counter1 = require('./util/counter');
	var	counter2 = require('./util/counter');

	console.log(counter1.count());
	console.log(counter2.count());
	console.log(counter2.count());

运行该程序的结果如下：

	$ node main.js
	1
	2
	3

可以看到，`counter.js`并没有因为被require了两次而初始化两次。

### 二进制模块

虽然一般我们使用JS编写模块，但NodeJS也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是`.node`外，和JS模块的使用方式相同。虽然二进制模块能使用操作系统提供的所有功能，拥有无限的潜能，但对于前端同学而言编写过于困难，并且难以跨平台使用，因此不在本教程的覆盖范围内。

### 小结

本章介绍了有关NodeJS的基本概念和使用方法，总结起来有以下知识点：

+ NodeJS是一个JS脚本解析器，任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用`node`命令。

+ 终端下直接输入`node`命令可进入命令交互模式，很适合用来测试一些JS代码片段，比如正则表达式。

+ NodeJS使用[CMD](http://wiki.commonjs.org/)模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

+ 除非JS模块不能满足需求，否则不要轻易使用二进制模块，否则你的用户会叫苦连天。
