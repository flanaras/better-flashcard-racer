package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by philip on 14/02/17.
 * @author Asa 22/01/2017
 */
public class LoginResponse {

    @JsonProperty
    private String username;

    @JsonProperty("auth_level")
    private String userRole;

    @JsonProperty("auth_id")
    private int authId;

    @JsonProperty("id")
    private int userid;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getAuthId() {
        return authId;
    }

    public void setAuthId(int authId) {
        this.authId = authId;
    }
}
