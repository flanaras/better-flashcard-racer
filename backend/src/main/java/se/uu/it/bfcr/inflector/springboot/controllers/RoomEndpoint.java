package se.uu.it.bfcr.inflector.springboot.controllers;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import se.uu.it.bfcr.inflector.springboot.models.GameRoom;
import org.springframework.web.socket.server.endpoint.SpringConfigurator;

/**
 * Created by Bartok on 2/21/17.
 */
@ServerEndpoint(value = "/room", configurator = SpringConfigurator.class)
public class RoomEndpoint {

    private final RoomEndpoint RoomService;

    @Autowired
    public RoomEndpoint(RoomService roomService) {
        this.roomService = roomService;
    }

    /*
    @OnOpen
    public void onOpen(Session session){
        System.out.println(session.getId() + " has opened a connection");
        try {
            session.getBasicRemote().sendText("Connection Established");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
    */

    @OnMessage
    public void onMessage(String message, Session session){
        System.out.println("Message from " + session.getId() + ": " + message);
        try {
            /*
            * Temporary notes:
            *
            * The different messages interpreted by the onMessage mehtod:
            * "CR:room-id:creator" -> Create a game room.
            * "JR:room-id" -> join a room.
            * "LR:" -> leave a room
            */
            switch (message.substring(0,2)) {
                case "CR:":
                    //Create room logic...
                    session.getBasicRemote().sendText("Message: Create Room");
                    break;
                case "JR:":
                    //Join room logic...
                    session.getBasicRemote().sendText("Message: Join Room");
                    break;
                case "LR:":
                    //Leave room logic...
                    session.getBasicRemote().sendText("Message: Leave Room");
                    break;
                default:
                    System.out.println("Unknown webSocket message");
                    throw new IOException();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    /*
    @OnClose
    public void onClose(Session session){
        System.out.println("Session " +session.getId()+" has ended");
    }
    */
}
