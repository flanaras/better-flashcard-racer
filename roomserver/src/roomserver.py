#-----------------------------------------------------------------------------------------------------------------------
#Install notes: (for now might fix later)
#   1. install pip: Download "https://bootstrap.pypa.io/get-pip.py" and run with "python get-pip.py"
#   2. install aiohttp: run "pip install aiohttp"
#   3. install socket.io: run "pip install python-socketio"
#-----------------------------------------------------------------------------------------------------------------------

from aiohttp import web
import socketio

class User:
    def __init__(self, id, username):
        self.id = id
        self.username = username

class Room:
    def __init__(self, id, roomName, hostId, hostName):
        self.id = id
        self.roomName = roomName
        self.hostId = hostId
        self.hostName = hostName
        self.players = []

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)
Lobby = []

#Sample stuff from socketio example...

@sio.on('connect', namespace='/chat')
def connect(sid, environ):
    print("connect ", sid)

@sio.on('chat message', namespace='/chat')
async def message(sid, data):
    print("message ", data)
    await sio.emit('reply', room=sid)

@sio.on('disconnect', namespace='/chat')
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    web.run_app(app)