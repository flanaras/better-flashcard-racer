package se.uu.it.bfcr.inflector.springboot.models;

/**
 * Created by Bartok on 2/10/17.
 */
public class User {

    private int id;
    private String username;
    private String auth_level;

    public User(){
        this.id = 0;
        this.username = "Default";
        this.auth_level = "Student";
    }

    public User(int ID,String name, int authlevel){
        this.id = ID;
        this.username = name;
        if(authlevel == 2){
            this.auth_level = "admin";
        }else if(authlevel == 1){
            this.auth_level = "teacher";
        } else{
            this.auth_level = "student";
        }
    }

    public String getUsername(){
        return username;
    }

    public int getId(){
        return id;
    }

    public String getAuth_level(){
        return auth_level;
    }

}