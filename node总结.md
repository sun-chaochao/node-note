# node总结

## 1. 开始

### 1.1. hello world

```javascript
var foo = 'hello node.js'
console.log(foo)
```

运行方式：在控制台的文件所在目录下：node 文件

![1565746719224](C:\Users\sun\AppData\Roaming\Typora\typora-user-images\1565746719224.png)

### 1.2. npm 

- node package manager

#### 1.2.1. 网站

```javascript
https://www.npmjs.com
```

#### 1.2.2. npm命令行工具

```javascript
npm --version //查看版本号

npm install --global npm //升级npm
```

#### 1.2.3 常用命令

- npm init
  - npm init -y 跳过向导，快速生成
- npm install  一次性把dependencise选项中的依赖项全部安装    npm i
- npm install 包名     只下载
- npm install --save 包名      下载并保存依赖项（package.json中的dependencise选项）  npm i -S 包名
- npm uninstall 包名     只删除  npm un 包名
- npm uninstall --save 包名  删除的同时也会把依赖信息删除  npm un -S 包名
- npm help 查看使用帮助
- npm 命令 --help 查看指定命令的使用帮助

#### 1.2.4 解决npm被墙问题

npm存储包文件的服务器在国外，有时候会被墙，速度很慢。

安装淘宝的cnpm:

```shell
npm install --global cnpm
```

接下来安装包时候把之前的npm 换为 cnpm

### 1.3. node.js是什么

#### 1.3.1. 前后端技术：

- 前端的技术：HTML、css和JavaScript

- 后端技术：打开服务器的黑盒子（Java、PHP、Python、Ruby、.Net(dot net)、node.js）

- 选择node.js主要是因为学习了JavaScript

#### 1.3.2. Node的解释：

- Node.js不是一门语言，不是库，不是框架，是一个JavaScript运行时环境，以前只有浏览器执行JavaScript，现在JavaScript可以脱离浏览器执行

#### 1.3.3. 浏览器中的js：

- EcmaScript（基础语法、if、var、function、object、array）、Bom和Dom

#### 1.3.4. Node中的JS：

- 没有BOM和DOM只有EcmaScript

- 在node这个JavaScript执行环境中为JavaScript提供了一些服务器级别的操作API

  例如：文件读写、网络服务的构建、网络通信、http服务等

#### 1.3.5. Node特性：

- 事件驱动和非阻塞IO模型（异步）

#### 1.3.6. Npm的解释：

- 是世界上最大的开源库生态系统，绝大数JavaScript相关的包都放在npm上

## 2. 文件操作

### 2.1 读文件

node中有文件操作能力，fs是file-system的简写,就是文件系统的意思。

在node中操作文件,必须引入fs这个核心模块，在fs中提供了所有文件操作的API。

```javascript
//1.使用require方法加载fs核心模块
var fs = require('fs');
//2.读取文件:第一个参数，文件的路径；
//第二个参数是一个回调函数：
//error,如果读取失败，error就是错误对象；如果读取成功，error就是null
//data,如果读取失败，data就是undefined；如果读取成功，data就是读取到的数据
fs.readFile('test.txt',function(error,data){
	//console.log(data.toString())
	//判断是否出错
	if(error){
		console.log('文件读取失败')
	}else{
		console.log(data.toString())
	}
})
```

### 2.1 写文件

```javascript
var fs = require('fs');
//参数：
//第一个参数：文件路径
//第二个参数：文件内容
//第三个参数：回调函数
//error,如果写入失败，error就是错误对象；如果写入成功，error就是null
fs.writeFile('test.md','大家好，才是真的好',function(error){
	if(error){
		console.log('文件写入失败')
	}else{
		console.log('文件写入成功')
	}
})
```

 ## 3. 构建简单的web服务器

在node中专门提供了一个核心模块:http,专门用来编写服务器的

 ```javascript
//1.加载http模块
var http = require('http')
//2.使用http.createServer()方法创建一个web服务器，返回一个server实例
var server = http.createServer();
//3.实现服务器功能
//request需要接受两个参数
//Request请求对象，可以用来获取客户端的一些请求信息，例如请求路径
//Response响应对象。可以用来给客户端发送响应消息
server.on('request',function(request, response){
	console.log('收到客户端的请求了'+request.url)
	response.write('hello')
	response.end()
})
//4.绑定端口号,启动服务器
server.listen(3000,function(){
	console.log('服务器启动成功')
});
 ```

可以通过以下方式，返回不同内容

```javascript
var http = require('http');
var server = http.createServer();
server.on('request',function(request, response){
	console.log('收到客户端的请求了')
	var url = request.url;
	if(url === '/'){
		response.end('index')
	}else if(url == '/login'){
		response.end('login')
	}else{
		response.end('404 not found')
	}   
})
server.listen(3000,function(){
	console.log('服务器启动成功')
});
```

## 4. 核心模块

核心模块：node为JavaScript提供了许多服务器级别的API,这些API绝大多数都被包装到了一个具名的核心模块中,例如：文件操作的fs核心模块,http服务构建的http模块,path路径操作模块,os操作系统模块.要使用就需要用require引用

```javascript
//用来获取机器信息
var os = require('os');
//用来获取操作路径
var path = require('path')
//获取当前机器的CPU信息
console.log(os.cpus())
//获取总内存大小
console.log(os.totalmem())
//获取扩展名
console.log(path.extname('c:/a/b/c/d/hello.txt'))
```

## 5. 引入其他js文件

require是一个方法，它的作用是用来加载模块的.

在node中没有全局作用域，只有模块作用域，外部无法访问到内部，内部也无法访问到外部

在node中，模块有三种：

- 具名的核心模块，例如:fs、http；

- 自己编写的文件模块，相对路径必须加./，且不能省略,可以省略.js
- 其他人写的文件模块

```javascript
require('./test1.js')
```

## 6. 加载与导出

由于在node中没有全局作用域，只有模块作用域，外部无法访问到内部，内部也无法访问到外部，所以在每个文件模块中都提供了一个对象：exports，它默认是一个空对象,需要在其他地方引用是需要用exports导出变量或者方法。在node中的JavaScript还有一个很重要的概念，模块系统：使用require方法用来加载模块；使用express接口对象用来导出模块中的成员。

### 6.1. require-加载模块

require方法有两个作用:

- 加载文件模块并执行里面的代码
- 拿到被加载文件模块导出的接口对象

```javascript
 var 自定义变量名称 = require（'模块'）
```

### 6.2 . exports

- Node中是模块作用域，默认文件中所有的成员只在当前文件模块中有效

- 对于希望可以被其他模块成员访问，我们需要把这些公开的成员都挂载到`exports`接口对象中就可以了

  导出多个成员（必须在对象中）：

```javascript
exports.a = 123
exports.b = 'hello'
exports.c = function(){
    console.log('ccc')
}
exports.d = {
    foo:'bar'
}

```

导出单个成员（拿到的就是：函数、字符串）：

```javascript
module.exports = 'hello'
```

以下情况会覆盖：

```javascript
module.exports = 'hello'

//以下面这个为准，上面的被覆盖

module.exports = function(x, y){
    return x + y
}
```

也可以这样来导出多个成员:

```javascript
module.exports = {
    add:function(){
        return x + y 
    }
    str: 'hello'
}//以对象的方式导出多个成员
```

### 6.3. 原理分析

export`和`module.exports`的一个引用

```javascript
exports === module.exports

exports.foo = 'bar'
//等价于
module.exports.foo = 'bar'
```

### 6.4.  exports 和 module.exports 的区别

- 每个模块中都有一个 module 对象
- module 对象中有一个 exports 对象
- 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
- 也就是：`moudle.exports.xxx = xxx` 的方式
- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
- `exports === module.exports` 结果为  `true`
- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
- 不要使用 `exports = xxx`
- 因为每个模块最终向外 `return` 的是 `module.exports`
- 而 `exports` 只是 `module.exports` 的一个引用
- 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
- 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的
- 之所以让大家明白这个道理，是希望可以更灵活的去用它

## 7. IP地址和端口号

- IP地址用来地位计算机
- 端口号用来定位具体的应用程序

```javascript
var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
	console.log('收到的请求路径' + req.url)
	console.log('请求我的客户端的地址是',req.socket.remoteAddress,req.socket.remotePort)
})

server.listen(3000,function(){
	console.log('服务器启动成功')
})
```

## 8. Content-Type

在node中可以通过设置content-type来设置响应的内容的类型

```javascript
var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
	var url = req.url;
	if(url ==='/plain'){
		res.setHeader('Content-Type','text/plain;charset=utf-8')
		res.end('hello 世界')
	}else if(url === '/html'){
		res.setHeader('Content-Type','text/html;charset=utf-8')
		res.end('<h1>hello html<a href="">点我</a></h1>')
	}
	
})

server.listen(3000,function(){
	console.log('服务器启动成功')
})
//////////////////////////////////////////////////////////////////////////
var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request',function(req,res){
	var url = req.url;
	if(url ==='/'){
		fs.readFile('./resource/index.html',function(err,data){
			if(err){
				res.setHeader('Content-Type','text/plain;charset=utf-8')
				res.end('文件读取失败，请稍后重试')
			}else{
				res.end(data)
			}
		})
	}else if(url ==='/pic'){
		fs.readFile('./resource/pic.jpeg',function(err,data){
			if(err){
				res.setHeader('Content-Type','text/plain;charset=utf-8')
				res.end('文件读取失败，请稍后重试')
			}else{
				res.setHeader('Content-Type','image/jpeg')
				res.end(data)
			}
		})
	}
})

server.listen(3000,function(){
	console.log('服务器启动成功')
})
```

## 9. 用node实现Apache功能

初步实现：

```javascript
var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request',function(req, res){
	console.log('收到客户端的请求了')
	var url = req.url;
	var wwwDir = './www/app';
	var filePath = 'index.html';
	if(url !== '/'){
		filePath = url;
	}
	fs.readFile(wwwDir + filePath,function(err,data){
		if(err){
			return res.end('404')
		}
		res.end(data)
	})
})
server.listen(3000,function(){
	console.log('服务器启动成功')
});
```

## 10. art-template的使用

### 10.1. art-template

art-template 是一个简约、超快的模板引擎。它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。使用art-template也便于维护代码，以前我们渲染数据是以模板字符串的形式在js文件中写入的html内容，如果html内容需要修改，我们需要在js中修改。而用了模板引擎以后，我们只需要html文件中修改html内容。还有使用了模板引擎以后DOM操作的效率也会更高一点。

网站：

https://aui.github.io/art-template/zh-cn/index.html  中文

### 10.2. 安装

```shell
npm install art-template
```

该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中，node_modules 不要改，也不支持改。

### 10.3. 使用

```javascript
// 1. 安装 npm install art-template
// 2. 在需要使用的文件模块中加载 art-template
//    只需要使用 require 方法加载就可以了：require('art-template')
//    参数中的 art-template 就是你下载的包的名字
//    也就是说你 isntall 的名字是什么，则你 require 中的就是什么
// 3. 查文档，使用模板引擎的 API


var template = require('art-template')
var fs = require('fs')
fs.readFile('tpl.html', function (err, data) {
  if (err) {
    return console.log('读取文件失败了')
  }
  // 默认读取到的 data 是二进制数据
  // 而模板引擎的 render 方法需要接收的是字符串
  // 所以我们在这里需要把 data 二进制数据转为 字符串 才可以给模板引擎使用
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })

  console.log(ret)
})
/////////////////////////////////////////////////////////////
<!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <title>{{ title }}</title>
 </head>
 <body>
   <p>大家好，我叫：{{ name }}</p>
   <p>我今年 {{ age }} 岁了</p>
   <h1>我来自 {{ province }}</h1>
   <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
</body>
</html>
```

### 10.4. package.json

我们建议每一个项目都有一个`package.json`文件（包描述文件）

这个文件可以通过```npm init```的方式来自动初始化

![1564970629320](C:\Users\sun\AppData\Roaming\Typora\typora-user-images\1564970629320.png)

对于我们目前来讲，最重要的是```dependencies```选项，可以用来帮我们保存第三方包的依赖信息

如果你的node_modules删除了也不需要担心，我们只需要：npm install就会把package.json中的dependencies中所有的依赖项都下载回来

- 建议每一个项目的根目录下都有一个```package.json```文件
- 建议执行```npm install```包名的时候都加上```--save```选项，目的是为了保存依赖信息

### 10.5. package -lock.json

是npm5以后版本在安装包的时候自动生成的，在5以后不用加参数--save，自动保存依赖信息

### 10.6. art-template 模板引擎(include、block、extend)
  + include
  + extend
  + block

```javascript
///////////////////layout.html//////////////////
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
  {{ block 'head' }}{{ /block }}
</head>
<body>
  {{ include './header.html' }}
  <!-- 留一个坑，将要留给孩子去填坑 -->
  
  {{ block 'content' }}
    <h1>默认内容</h1>
  {{ /block }}

  {{ include './footer.html' }}
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  {{ block 'script' }}{{ /block }}
</body>
</html>
///////////////////index.html//////////////////
{{extend './layout.html'}}

{{ block 'head' }}
<style>
  body {
    background-color: skyblue;
  }
</style>
{{ /block }}

{{ block 'content' }}
<div>
  <h1>index 页面填坑内容</h1>
</div>
{{ /block }}

{{ block 'script' }}
<script>
  window.alert('index 页面自己的 js 脚本')
</script>
{{ /block }}    
//////////////////////list.html////////////////////////
{{extend './layout.html'}}

{{ block 'content' }}
<div>
  <h1>列表页自己的内容</h1>
</div>
{{ /block }}
////////////////头部和底部//////////////
<div>
  <h1>公共的头部</h1>
</div>
<div>
  <h1>公共的底部</h1>
</div>
```

## 11. express

原生的http在某些方面表现不足以应对我们的开发需求，所以我们需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更高度统一。

网址：http://expressjs.com/

### 11.1. 安装

```shell
npm install --save express
```

### 11.2. hello world

```javascript
//引包
var express = require('express')

//创建服务器应用程序
var app = express()

app.get('/about',function(req,res){
    //res.end('hello world')
	res.send('hello world')
})

app.listen(3000,function(){
	console.log('app is running at port 3000.')
})
```

### 11.3. 公开文件

```javascript
// /public资源
app.use(express.static('public'))
// /files资源
app.use(express.static('files'))
// /public/xxx
app.use('/public',express.static('public'))
// /static/xxx
app.use('/static',express.static('public'))

app.use('/static',express.static(path.join(_dirname,'public')))

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))
```

### 11.4. 在express获取表单get请求体数据

在express中有内置获取表单get请求体的API,可以通过req.query来获取数据

```javascript
req.query
```

### 11.5. 在express获取表单post请求体数据

在express中没有内置获取表单post请求体的API，这里我们需要使用一个第三方包，body-parser

安装：

```shell
npm install --save body-parser
```

配置:

```javascript
var express = require('express')
var bodyParser = require('body-parser')//引包
var app = express()

app.use(bodyParser.urlencoded({extended: false}))//解析URL 
app.use(bodyParser.json())//解析json文件
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
app.post('/login', function (req, res) {
    console.log(req.body)//获取post请求数据
})
app.listen(3000,function(){
	console.log('app is running at port 3000.')
})
```

## 12. 在express中配置使用art-template模板引擎

网站： [art-template官网](http://aui.github.io/art-template/zh-cn/)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```javascript
app.engine('art', require('express-art-template'));

app.engine('html', require('express-art-template'));
```

使用：

```javascript
app.get('/',function(req, res){
	res.render('404.html',{
        title:'hello world'
    })
})
```

如果希望修改默认的views视图渲染存储目录，可以

```javascript
app.set('views', render函数的默认路径)//第一个参数一定是views
```

## 13. crud（增删改查）

对文件数据进行增删改查

```javascript
//app.js
//入口模块
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

// app.use('/node-modules/', express.static('/node-modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html', require('express-art-template'));

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(3000,function(){
	console.log('running 3000......')
})
/////////////////////////////////////////////
//db.json
{
	"students": [{
		"id": 2,
		"name": "李斯",
		"gender": 0,
		"age": 18,
		"hobbies": "吃饭、睡觉、打豆豆、LOL"
	}, {
		"id": 3,
		"name": "小明兴",
		"gender": "0",
		"age": "18",
		"hobbies": "打豆豆"
	}, {
		"id": 5,
		"name": "张三",
		"gender": 0,
		"age": 18,
		"hobbies": "吃饭、睡觉、打豆豆、LOL"
	}, {
		"id": 6,
		"name": "张三",
		"gender": 0,
		"age": 18,
		"hobbies": "吃饭、睡觉、打豆豆、LOL"
	}, {
		"name": "sunny",
		"gender": "1",
		"age": "22",
		"hobbies": "睡觉",
		"id": 7
	}]
}
/////////////////////////////////////////////
//student.js
/**
 * 对文件中数据进行处理
 * 
 */
var fs = require('fs')

var dbpath = './db.json'
/**
 * 获取学生信息
 */
exports.find = function(callback){
	fs.readFile(dbpath,function(err,data){
		if(err){
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}
/**
 * 通过id获取学生信息
 */
exports.findById = function(id, callback){
	fs.readFile(dbpath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})
}
/**
 * 添加保存学生信息
 */
exports.save = function(student,callback){
	fs.readFile(dbpath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		student.id = students[students.length - 1].id + 1
		students.push(student)
		var fileData = JSON.stringify({
			students:students
		})
		fs.writeFile(dbpath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
/**
 * 更新学生信息
 */
exports.Update = function(student, callback){
	fs.readFile(dbpath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		student.id = parseInt(student.id)
		var stu = students.find(function(item){
			return item.id === student.id
		})
		
		for(var key in student){
			stu[key] = student[key]
		}
		var fileData = JSON.stringify({
			students:students
		})
		fs.writeFile(dbpath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
/**
 * 删除学生信息
 */
exports.delete = function(id, callback){
	fs.readFile(dbpath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})
		students.splice(deleteId, 1)
		
		var fileData = JSON.stringify({
			students:students
		})
		fs.writeFile(dbpath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
```

路由设计

| 请求方法 | 请求路径         | get参数 | post参数                   | 备注             |
| -------- | ---------------- | ------- | -------------------------- | ---------------- |
| GET      | /students        |         |                            | 渲染页面         |
| GET      | /students/new    |         |                            | 渲染添加学生页面 |
| POST     | /students        |         | name/age/gender/hobbies    | 处理添加学生系统 |
| GET      | /students/edit   | id      |                            | 渲染编辑页面     |
| POST     | /students/edit   |         | id/name/age/gender/hobbies | 处理编辑请求     |
| GET      | /students/delete | id      |                            | 处理删除请求     |
| ......   |                  |         |                            |                  |
| ......   |                  |         |                            |                  |

## 14. MongoDB数据库

### 14.1. 关系型数据库与非关系型数据库

表就是关系，或者说表与表之间存在关系。

- 所有的关系型数据库都需要通过sql语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
- 非关系型数据库非常灵活

### 14.2. 安装

- 可以在菜鸟教程中找到链接：https://www.runoob.com/mongodb/mongodb-tutorial.html

- 下载地址：https://www.mongodb.com/download-center#community

- 官网下载：https://www.mongodb.com/

- 安装

- 配置环境变量

- 测试：在命令行中输入mongod --version

  ![1565333201071](C:\Users\sun\AppData\Roaming\Typora\typora-user-images\1565333201071.png)

### 14.3. 在node.js中使用MongoDB

#### 14.3.1. 使用官方的MongoDB包来操作

- 网址：https://github.com/mongodb/node-mongodb-native

#### 14.3.2. 使用第三方mongoose来操作MongoDB数据库

第三方包：mongoose基于MongoDB官方的mongodb包再一次做了封装

- 网址：https://mongoosejs.com/

安装

```shell
npm i mongoose
```

demo

```javascript
var mongoose = require('mongoose');
// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
// 创建一个模型
// 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// mongoose 这个包就可以让你的设计编写过程变的非常的简单
var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: '喵喵'});// 实例化一个 Cat
kitty.save(function (err) {// 持久化保存 kitty 实例
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});
```

### 14.4. MongoDB数据库的基本概念

- 可以有多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合可以有多个文档（表记录）
- 文档结构很灵活，没有任何限制
- MongoDB非常灵活，不需要像MySQL一样先创建数据库、表、设计表结构

#### 14.4.1. 使用

```javascript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/itcast')

// 2. 设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 3. 将文档结构发布为模型
//    mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//   
//    返回值：模型构造函数
var User = mongoose.model('User', userSchema)
//4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
```

#### 14.4.2.  新增数据

```javascript
var admin = new User({
  username: 'zs',
  password: '123456',
  email: 'admin@admin.com'
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

#### 14.4.3.  查询数据

```javascript
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
//按条件查
// User.find({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })
//找符合条件的第一个
// User.findOne({
//   username: 'zs'
// }, function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })
```

#### 14.4.4.  删除数据

```javascript
User.remove({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功')
    console.log(ret)
  }
})
```

#### 14.4.5. 更新数据

```javascript
User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
```

## 15. promise

### 15.1. callback hell:

![1565423835615](C:\Users\sun\AppData\Roaming\Typora\typora-user-images\1565423835615.png)

无法保证顺序的代码：

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data)
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      // return console.log('读取失败')
      // 抛出异常
      //    1. 阻止程序的执行
      //    2. 把错误消息打印到控制台
      throw err
    }
    console.log(data)
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      if (err) {
        // return console.log('读取失败')
        // 抛出异常
        //    1. 阻止程序的执行
        //    2. 把错误消息打印到控制台
        throw err
      }
      console.log(data)
    })
  })
})

```

为了解决以上编码方式带来的问题（回调地狱嵌套），所以在es6中新增了一个API：`Promise`

### 15.2.  Promise概念

![1565504207121](C:\Users\sun\AppData\Roaming\Typora\typora-user-images\1565504207121.png)

封装promise API

```javascript
var fs = require('fs')
function pReadFile(filePath){
	return new Promise(function(resolve,reject){
		fs.readFile(filePath,'utf8', function(err, data){
			if(err){
				reject(err)
			}else{
				resolve(data)
			}
		})
	})
}
//使用
pReadFile('./data/a.txt')
	.then(function(data){
		console.log(data)
		return pReadFile('./data/b.txt')
	})
	.then(function(data){
		console.log(data)
		return pReadFile('./data/c.txt')
	})
	.then(function(data){
		console.log(data)
	})
```

promise版ajax:

```javascript
pGet('http://127.0.0.1:3000/users/4')
	.then(function(data) {
		console.log(data)
	})
function pGet(url, callback) {
	return new Promise(function(resolve, reject) {
		var oReq = new XMLHttpRequest()
		// 当请求加载成功之后要调用指定的函数
		oReq.onload = function() {
			// 我现在需要得到这里的 oReq.responseText
			callback && callback(JSON.parse(oReq.responseText))
			resolve(JSON.parse(oReq.responseText))
		}
		oReq.onerror = function(err) {
			reject(err)
		}
		oReq.open("get", url, true)
		oReq.send()
	})
}
```

## 16. express-session

```javascript
var session = require('express-session')

app.use(session({
	secret: 'itcast',//目的是为了增加安全性
	resave: false,
	saveUninitialized: true//无论是否使用session，都默认用session保存
}))

router.post('/login', function (req, res) {
	req.session.user = user
})
```

## 补充

### 1. node中的其他成员

在每个模块中，除了require、exports 等模块相关API之外，还有两个特殊的成员：

- `__dirname`**动态获取**可以用来获取当前文件模块所属目录的绝对路径
- `__filename`**动态获取**可以用来获取当前文件的相对路径
- 他们都不受node命令执行路径的影响

模块中的路径标识和文件操作中的相对路径标识不一致模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响这不是错误，Node 就是这样设计的。就是说，文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的路径

### 2. 修改完成自动重启

可以使用一个第三方命名行工具：`nodemon`来帮助我们解决频繁修改代码重启服务器问题，他是一个基于node.js开发的第三方命令行工具

安装：

```shell
npm install --global nodemon 
```

安装完毕后，使用：

```shell
node app.js

//使用nodemon
nodemon app.js 
```

### 3. 加密MD5

```javascript
var md5 = require('blueimp-md5')
password = md5(md5(body.password))
```

