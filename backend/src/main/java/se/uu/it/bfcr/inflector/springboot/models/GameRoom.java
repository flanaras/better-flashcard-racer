package se.uu.it.bfcr.inflector.springboot.models;

import java.util.ArrayList;
import se.uu.it.bfcr.inflector.springboot.models.User;

/**
 * Created by Bartok on 2/21/17.
 */
public class GameRoom {
    private ArrayList<User> players;

    public int getNumPlayers(){
        return players.size();
    }

    public ArrayList<User> getPlayers(){
        return players;
    }
}
