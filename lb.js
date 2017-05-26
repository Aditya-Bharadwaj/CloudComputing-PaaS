var express = require('express');
var app = express();
var fs = require('fs');
var http = require("http");

var req_count = 0 ;

/*
	Listens to requests for webpage, and passes it to server.js on the load b
*/

app.get("/newbooks",function(request, response){
    req_count ++;
if(req_count%2==0){
var options = {
host: '192.168.2.105',//server 1 ip
port: 3000,
path: '/newbooks'
};
}
else{
var options = {
  host: '192.168.2.100',//server 2 ip
  port: 3000,
  path: '/newbooks'
};
}
http.get(options, function(resp){
  resp.on('data', function(chunk){
    console.log("Load Balancer :Received Reponse from server");
   response.writeHead(200, {'Content-Type': 'text/html'});
   response.end(chunk);
  });
});
});

app.get("/oldbooks",function(request, response){
req_count ++;
if(req_count%2==0){
var options = {
host: '192.168.2.105',//server 1 ip
port: 3000,
path: '/oldbooks'
};
}
else{
var options = {
  host: '192.168.2.100',//server 2 ip
  port: 3000,
  path: '/oldbooks'
};
}
http.get(options, function(resp){
  resp.on('data', function(chunk){
    console.log("Received Reponse from server");
   response.writeHead(200, {'Content-Type': 'text/html'});
   response.end(chunk);
  });
});
});

app.get("/data",function(request, response){
req_count ++;
if(req_count%2==0){
var options = {
host: '192.168.2.105',//server 1 ip
port: 3001,
path: '/data?tid='+request.query.tid+'&bid='+request.query.bid
};
}
else{
var options = {
  host: '192.168.2.100',//server 2 ip
  port: 3001,
  path: '/data?tid='+request.query.tid+'&bid='+request.query.bid
};
}
http.get(options, function(resp){
  resp.on('data', function(chunk){
    console.log("Received Reponse from server");
   response.writeHead(200, {'Content-Type': 'application/json'});
   response.end(chunk);
  });
});
});



app.listen(3000, function () {
  console.log('Loadbalancer listening')
});
