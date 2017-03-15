from aiohttp import web
import socketio
import json
import itertools
import uuid

class User:
    def __init__(self, id, username, sid, authLevel):
        self.id = id
        self.username = username
        self.sid = sid
        self.authLevel = authLevel

class Deck:
    def __init__(self, id, numProblems, name, description, user_id, user_name, created, changed, private, Flashcard):
        self.id = id
        self.numProblems = numProblems
        self.name = name
        self.description = description
        self.user_id = user_id
        self.user_name = user_name
        self.created = created
        self.changed = changed
        self.private = private
        self.flashcard = Flashcard

class Flashcard:
    def __init__(self, id, problem, answer):
        self.id = id
        self.problem = problem
        self.answer = answer

class Room:
    def __init__(self, id, roomName, User, Deck):
        self.id = id
        self.roomName = roomName
        self.host = User
        self.deck = Deck
        self.players = []

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

Lobby = []
Rooms = []
UsersInrRoms = []

async def roomJSON():
    JSON = []
    for room in Rooms:
        print('    Room: ',room.roomName,' id: ',str(room.id))
        host = {'id': room.host.id, 'auth_level': room.host.authLevel, 'username': room.host.username}
        cards = cardsAsList(room.deck.flashcard)
        deck = {'id': room.deck.id, 'numProblems':room.deck.numProblems, 'name': room.deck.name, 'description': room.deck.description, 'user_id': room.deck.user_id, 'user_name': room.deck.user_name, 'created': room.deck.created, 'changed': room.deck.changed, 'private': room.deck.private, 'flashcard': cards}
        info = {'id': room.id, 'name': room.roomName, 'host': host, 'deck': deck, 'players': playersASlist(room.players)}
        JSON.append(info)
    await sio.emit('updaterooms',data = json.dumps(JSON),namespace = '/lobby')
    JSON = None

async def cleanUp():
    for user in Lobby:
        if user.sid == sid:
            Lobby.remove(user)
    for room in Rooms:
        '''
        if room.hostsid == sid:
            destroyRoom(room.id)
        else:
        '''
        for player in room.players:
            if player.sid == sid:
                room.players.remove(player)
    await roomJSON()

def playersASlist(players):
    list = []
    for user in players:
        info = {"id": user.id, "username": user.username, "auth_level": user.authLevel}
        list.append(info)
    return list

def cardsAsList(cards):
    list = []
    for card in cards:
        info = {"id": card.id, "problem": card.problem, "answer": card.answer}
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

@sio.on('connect', namespace='/lobby')
def connect(sid, environ):
    print('connected to lobby service: ', sid)

@sio.on('disconnect', namespace='/lobby')
def disconnect(sid):
    print('disconnected from lobby service: ', sid)

@sio.on('join_lobby', namespace='/lobby')
async def join_lobby(sid, data):
    print("join: ", data)
    flag = False
    for user in Lobby:
        if user.sid == sid or user.id == data.get('id'):
            flag = True
            print("User already in lobby!: ",user.username)
    if flag == False :
        Lobby.append(User(data.get('id'), data.get('username'), sid, data.get('auth_level')))
    await roomJSON()

@sio.on('leave_lobby', namespace='/lobby')
async def leave_lobby(sid, data):
    for user in Lobby:
        if(user.id == data.get("id")):
            Lobby.remove(user)
            print("User left lobby: ",user.username)

@sio.on('create_room', namespace='/lobby')
async def create_room(sid, data):
    print("CR: ", data)
    host = None
    exists = False
    if exists:
        print("Create room: Room already exists!")
    else:
        for user in Lobby:
            print(user.username)
            host = data.get("host")
            if user.sid == sid and user.id == host.get("id"):
                host = user
        if host != None:
            deck =  data.get("deck")
            flashcard = deck.get("flashcards")
            cards = []
            for card in flashcard:
                newCard = Flashcard(card.get('id'), card.get('problem'), card.get('answer'))
                cards.append(newCard)
            deckObject = Deck(deck.get('id'), deck.get('numProblems'), deck.get('name'), deck.get('description'), deck.get('user_id'), deck.get('user_name'), deck.get('created'), deck.get('changed'), deck.get('private'), cards)

            Rooms.append(Room(str(uuid.uuid1()), data.get('name'), host, deckObject))
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
                await roomJSON()
            else:
                print("Player could not join the room")
    else:
        print("No such room (id): ",data.get('id'))

@sio.on('leave_room', namespace='/lobby')
async def leave_room(sid, data):
    leaveid = data.get('id')
    for room in Rooms:
        if room.id == leaveid:
            '''
            if room.host.sid == sid:
                destroyRoom(leaveid)
            else:
            '''
            for user in room.players:
                if user.sid == sid:
                    Lobby.append(user)
                    room.players.remove(user)
                    print("User: ",user.username," left: ",room.roomName)
    await roomJSON()

if __name__ == '__main__':
    web.run_app(app,host='127.0.0.1',port=9000)