var express = require('express');
var app = express();
var fs = require('fs');

/*
	Serves web pages based on the requests
*/

app.get("/newbooks",function(request, response){
var html = fs.readFileSync('nb.html');
    console.log('Worker.js: Received Request on 192.168.2.105');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html);
});

app.get("/oldbooks",function(request, response){
var html = fs.readFileSync('ob.html');  
    console.log('Worker.js: Received Request on 192.168.2.105');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html);
});

app.get("/data",function(request, response){console.log(request.query.bid)});

app.listen(3000, function () {
  console.log('Html serving app listening')
});
