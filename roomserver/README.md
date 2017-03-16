The python websocket server used by the better flashcard racer project.

INSTALL/RUN NOTES:
   1. install python ver 3.5 or newer
   2. install pip: Download "https://bootstrap.pypa.io/get-pip.py" and run with "python get-pip.py"
   3. install aiohttp: run "pip install aiohttp"
   4. install socket.io: run "pip install python-socketio"
   5. start server: run "python roomserver.py"

   NOTE: The 'host' parameter in the 'web.run_app()' method call must be specified to the host machine's IP-address for
   use as a remote websocket server, for a local server the default settings are sufficient.
   
USAGE:

Clients should listen to websocket event: "updaterooms".

Descriptions and JSON payload examples for the websocket messages:

join_lobby: A user joins the lobby where a list of available games to join is presented.

    Parameters:
    "id": The desired id of the user that wishes to join the lobby, the id will represent the user
    and is tied to the session id (sid) of the connection created with the weboskcet server when handling the
    'on.connect' message.

    Example:
    {
        "id": 1,
    }

leave_lobby: A user leaves the lobby.

    Parameters:
    "id": The id of the user to leave the lobby, see 'join_lobby'.

    Example:
    {
        "id": 1,
    }

create_room: A user creates a 'game-room', allowing other user to join it with the join_room message.

    Parameters:
    "name": The desired name of the game-room.
    "host": The user that will 'host' the room. If the host leaves the game, it is automatically disbanded and all
    users inside ejected back to the lobby. The "host" parameter will be ignored and the user sending the message will
    automatically become the host if they have already joined the lobby with the join_lobby message.
    "deck": The flashcard deck to be played in the game-room.

    Example:
    {
        "name": "user's room",
        "host": {
            "id": 1,
            "auth_level": "teacher",
            "username": "miaTeacher"
        },
    "deck": {
        "id": 1,
        "numProblems": 5,
        "name": "A test deck",
        "description": "Description for a test deck",
        "user_id": 2,
        "user_name": "John",
        "created": "2017-01-25T20:17:45.000Z",
        "changed": "2017-01-25T20:17:45.000Z",
        "private": false,
        "flashcard":
            [
                {
                    "id": 1,
                    "problem": "1+1",
                    "answer": 2
                },
                {
                    "id": 2,
                    "problem": "2+2",
                    "answer": 4
                }
            ]
        }
    }

join_room: A user joins a game room.

    Parameters:
    "id": The id of the room to join (Automatically assigned by the server).

    Example:
    {
        "id": 1,
    }

leave_room: A user leaves a game room.

    Parameters:
    "id": The id of the room to leave.

    Example:
    {
        "id": 1,
    }