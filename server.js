
var express = require('express');
var app = express();
var fs = require('fs');
var http = require("http");

var req_count = 0 ;
/*
	Listens to incoming search requests, and passes the params to dbserver.js
*/
app.get("/data",function(request, response){
console.log("Server.js :"+ request.query);
var options = {
host: '192.168.2.105',//server 1 ip
port: 4700,
path: '/?tid='+request.query.tid+'&bid='+request.query.bid
};
console.log("Server.js:" + options.ip + " " + options.path);
 http.get(options, function(resp){
  resp.on('data', function(chunk){
    console.log("Server.js : Received Reponse from server");
   response.writeHead(200, {'Content-Type': 'application/json'});
   response.end(chunk);
  });
});

});


app.listen(3001, function () {
  console.log('Server listening on 192.168.2.105:3001')
});



