package se.uu.it.bfcr.inflector.springboot.models;

/**
 * Created by Bartok on 2/10/17.
 */
public class User {

    private int id;
    private String username;
    private String auth_level;
    private String password;

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
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
    }

    public User(int ID,String name, int auth_level){
        this.id = ID;
        this.username = name;
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

    public String getAuth_level(){
        return auth_level;
    }

}