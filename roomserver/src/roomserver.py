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

UsersInrRoms = []

#Lobby methods:

@sio.on('connect', namespace='/lobby')
def connect(sid, environ):
    print('connected to lobby service: ', sid)

@sio.on('disconnect', namespace='/lobby')
def disconnect(sid):
    #Cleanup!!!!
    print('disconnected from lobby service: ', sid)

@sio.on('join_lobby', namespace='/lobby')
async def join_lobby(sid, data):
    print("join: ", data)
    flag = False
    for user in Lobby:
        if user.sid == sid:
            flag = True
            print("User already in lobby!: ",user.username)
    if flag == False :
        Lobby.append(User(data.get('id'), data.get('username'), sid))
    await lobbyJSON()

async def lobbyJSON():
    JSON = []
    for user in Lobby:
        print('    Name: ',user.username + ' id: ' + str(user.id))
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
    await lobbyJSON()

#Room methods:

#Needs to be implemented:
@sio.on('create_room', namespace='/lobby')
async def create_room(sid, data):
    print("CR: ", data)
    host = None
    for user in Lobby:
        if user.sid == sid:
            host = user
    if host != None:
        Rooms.append(Room(data.get('id'),data.get('roomname'),host.id,host.username,host.sid))
        Lobby.remove(host)
        print("Created room, hostID: ",host.id)
        await roomJSON()
        await lobbyJSON()
    else:
        print("Create room: User not in Lobby!")

@sio.on('join_room', namespace='/lobby')
async def join_room(sid, data):
    exists = False
    print("JR: ", data)
    for room in Rooms:
        if data.get('id') == room.id:
            exists = True
            roomtojoin = room
    if exists:
        for user in Lobby:
            if user.sid == sid:
                roomtojoin.players.append(user)
                Lobby.remove(user)
                print("Player ",user.username," joined room (id): ",roomtojoin.id)
                await lobbyJSON()
                await roomJSON()
    else:
        print("No such room (id): ",data.get('id'))

async def roomJSON():
    JSON = []
    for room in Rooms:
        print('    Room: ',room.roomName,' id: ',str(room.id))
        info = {'id': room.id, 'roomname': room.roomName, 'hostID': room.hostId, 'hostname': room.hostName, 'players': playersASlist(room.players)}
        JSON.append(info)
    await sio.emit('updaterooms',data = json.dumps(JSON),namespace = '/lobby')
    JSON = None

#Ugly list helper...
def playersASlist(players):
    list = []
    for user in players:
        info = {"id": user.id, "username": user.username}
        list.append(info)
    return list

def destroyRoom(id):
    Desroom = None
    for room in Rooms:
        if id == room.id:
            Desroom = room
    oldhost = User(Desroom.hostId,Desroom.hostName,Desroom.hostsid)
    Lobby.append(oldhost)
    for user in Desroom.players:
        Lobby.append(user)
    Rooms.remove(Desroom)

#Needs to be implemented:
@sio.on('leave_room', namespace='/lobby')
async def leave_room(sid, data):
    leaveid = data.get('id')
    for room in Rooms:
        if room.id == leaveid:
            if room.hostsid == sid:
                destroyRoom(leaveid)
            else:
                for user in room.players:
                    if user.sid == sid:
                        Lobby.append(user)
                        room.players.remove(user)
                        print("User: ",user.username," left: ",room.roomName)
    await lobbyJSON()
    await roomJSON()


#Run server method:

if __name__ == '__main__':
    web.run_app(app,host='127.0.0.1',port=9000)