#-----------------------------------------------------------------------------------------------------------------------
#Install/Run notes: (for now might add included packages later)
#   0. install python ver > 3.5
#   1. install pip: Download "https://bootstrap.pypa.io/get-pip.py" and run with "python get-pip.py"
#   2. install aiohttp: run "pip install aiohttp"
#   3. install socket.io: run "pip install python-socketio"
#   4. start server: run "python roomserver.py"
#-----------------------------------------------------------------------------------------------------------------------

from aiohttp import web
import socketio
import json

class User:
    def __init__(self, id, username, sid):
        self.id = id
        self.username = username
        self.sid = sid

class Room:
    def __init__(self, id, roomName, hostId, hostName, hostsid):
        self.id = id
        self.roomName = roomName
        self.hostId = hostId
        self.hostName = hostName
        self.players = []
        self.hostsid = hostsid

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

Lobby = []
Rooms = []

#Lobby Responses:

@sio.on('connect', namespace='/lobby')
def connect(sid, environ):
    print('connected to lobby service: ', sid)

@sio.on('join_lobby', namespace='/lobby')
async def join_lobby(sid, data):
    print("join: ", data)
    flag = False
    for user in Lobby:
        if user.id == data.get("id"):
            flag = True
            print("User already in lobby!: ",user.username)
    if flag == False :
        Lobby.append(User(data.get('id'), data.get('username'), sid))
    return await lobbyJSON()

async def lobbyJSON():
    JSON = []
    for user in Lobby:
        print('Name: ',user.username + ' id: ' + str(user.id))
        info = {'id': user.id, 'username': user.username}
        JSON.append(info)
    await sio.emit('updatelobby',data = json.dumps(JSON),namespace = '/lobby')
    JSON = None

@sio.on('leave_lobby', namespace='/lobby')
async def leave_lobby(sid, data):
    print("leave: ", data)
    for user in Lobby:
        if(user.id == data.get("id")):
            Lobby.remove(user)
            print("User left lobby: ",user.username)
    return await lobbyJSON()


@sio.on('disconnect', namespace='/lobby')
def disconnect(sid):
    print('disconnected from lobby service: ', sid)

#Room responses:

@sio.on('disconnect', namespace='/room')
def disconnect(sid):
    print('disconnected from room service: ', sid)

#Needs to be implemented:
@sio.on('create_room', namespace='/room')
async def create_room(sid, data):
    print("message ", data)

#Needs to be implemented:
@sio.on('leave_room', namespace='/room')
async def leave_room(sid, data):
    print("message ", data)

@sio.on('connect', namespace='/room')
def connect(sid, environ):
    print('connected to room service: ', sid)

#Run server method:

if __name__ == '__main__':
    web.run_app(app,host='127.0.0.1',port=9000)