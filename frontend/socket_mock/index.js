var server = require('http').createServer();
var io = require('socket.io')(server);

var userList = [];
var id = 1;

io.on('connection', function(client){

  userList.push({id : id, username : 'Test User'});

  client.emit('users', {users: userList});

  client.broadcast.emit('newStudent', {user: {id : id, username: 'Test User'}});

  id++;


  client.on('disconnect', function(){
    console.log('Client disconnected');
    client.broadcast.emit('studentLeft', {user: userList[userList.length - 1]});
    userList.pop();
  });
});
server.listen(8080);

