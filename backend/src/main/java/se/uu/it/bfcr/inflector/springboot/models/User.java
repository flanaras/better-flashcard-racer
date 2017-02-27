package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by Bartok on 2/10/17.
 */
public class User {

    private int id;
    private String username;
    private String auth_level;
    private String password;

    @JsonProperty("auth_id")
    private int authId;

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAuthId(int auth_id) {
        this.authId = auth_id;
    }

    public void setAuth_level(String auth_level) {
        this.auth_level = auth_level;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public User(){
        this.id = 0;
        this.username = "Default";
        this.auth_level = "student";
        this.authId = 0;
    }

    public User(int ID,String name, int auth_level){
        this.id = ID;
        this.username = name;
        this.authId = auth_level;
        if(auth_level == 2){
            this.auth_level = "admin";
        }else if(auth_level == 1){
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

    public int getAuthId(){
        return authId;
    }

    public String getAuth_level(){
        return auth_level;
    }

}