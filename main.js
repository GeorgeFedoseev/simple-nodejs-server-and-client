var http = require('http');
var socket_io = require('socket.io')


var SOCKET_PORT = 3000;
var HTTP_PORT = 3001;

var server = http.createServer();



// start Socket.io server
var io = socket_io(server);



var clients = [];


io.on('connection', function(client){
  clients.push(client);

  console.log("Client connected! total: "+clients.length);

  
  client.on('disconnect', function(){
  	
  });




  client.on('inputDelta', function (delta) {
	console.log("Delta: "+delta);

	// broadcast to all clients
	for(var k in clients){
		clients[k].emit("inputDelta", delta);
	}

  });



});


server.listen(SOCKET_PORT);
console.log('Listening socket_io on port '+SOCKET_PORT);



// start serving static files

 var serveStatic = require('serve-static');


 

var connect = require('connect'),
    directory = './www/';

connect()
    .use(serveStatic(directory))
    .listen(HTTP_PORT);

console.log('Listening http on port '+HTTP_PORT);







