package se.uu.it.bfcr.inflector.springboot.models;

import java.util.ArrayList;
import se.uu.it.bfcr.inflector.springboot.models.User;
import javax.websocket.Session;

/**
 * Created by Bartok on 2/21/17.
 */
public class GameRoom {
    private int id;
    private ArrayList<User> players;
    private ArrayList<Session> sessions;

    public int getNumPlayers(){
        return players.size();
    }

    public ArrayList<User> getPlayers(){
        return players;
    }

    public int getId(){
        return id;
    }

    public ArrayList<Session> getSessions(){
        return sessions;
    }

    //mehtods for adding user to game etc...
}