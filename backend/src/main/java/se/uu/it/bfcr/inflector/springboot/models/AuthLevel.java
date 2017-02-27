package se.uu.it.bfcr.inflector.springboot.models;

/**
 * Created by Asa on 2/21/2017.
 */
public class AuthLevel {
    private int id;
    private String auth;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public AuthLevel(int id, String auth) {
        this.id = id;
        this.auth = auth;
    }

}
