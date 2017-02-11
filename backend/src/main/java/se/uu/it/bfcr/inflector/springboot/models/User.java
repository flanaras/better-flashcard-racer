package backend.src.main.java.se.uu.it.bfcr.inflector.springboot.models;

/**
 * Created by Bartok on 2/10/17.
 */
public class User {

    private int id;
    private String username;
    private int auth_level;

    public User(){
        this.id = -1;
        this.username = "Default";
        this.auth_level = -1;
    }

    public User(int ID,String name, int authlevel){
        this.id = ID;
        this.username = name;
        this.auth_level = authlevel;
    }

    public String getUsername(){
        return username;
    }

    public int getId(){
        return id;
    }

    public int getAuth_level(){
        return auth_level;
    }

}