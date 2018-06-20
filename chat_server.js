var app = require('express')();
var server = require('http').Server(app);
//var models = require

var io = require('socket.io')(server);

var userArray = [];

io.on('connection', function(socket){

	socket.on('new user', function(user){
		userArray.push(user);

		io.emit('new user', userArray);
	});

	socket.on('chat_message', function(msg, user){
		//Save in DB
		io.emit('chat_message', msg, user);
	});


	socket.on('typing', function(user) {
		socket.broadcast.emit('typing', user);
	});

	socket.on('stop typing', function (user) {
    	socket.broadcast.emit('stop typing');
	});

	socket.on('user logout', function(user) {
		var userIndex = userArray.indexOf(user);
		if(userIndex > -1) {
			userArray.splice(userIndex, 1);
		}
		io.emit('user logout', userArray);
	});
});

var port = process.env.PORT || '4000';
server.listen(port, () => console.log('Listening on 4000'));