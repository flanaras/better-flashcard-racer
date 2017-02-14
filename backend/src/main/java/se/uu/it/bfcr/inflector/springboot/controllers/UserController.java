package se.uu.it.bfcr.inflector.springboot.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.LoginResponse;
import se.uu.it.bfcr.inflector.springboot.models.User;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import org.springframework.stereotype.Component;

/**
 * Created by Bartok on 2/9/17.
 */
@Component
public class UserController {
    public ResponseContext getUserById(RequestContext requestContext, Long id) throws SQLException{
        User user = new User();
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = "SELECT * FROM users WHERE users.ID = " + id;

        try{
            con = DBConnect.connect();
            stmnt = con.createStatement();
            res = stmnt.executeQuery(query);

            res.first();
            user = new User(res.getInt("id"), res.getString("username"), res.getInt("authlevel"));

        }catch (SQLException ex){
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }finally {
            try {
                stmnt.close();
                res.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }
        return new ResponseContext().status(Status.OK).entity(user);
    }

    public ResponseContext getUsers(RequestContext requestContext) throws SQLException{
        ArrayList<User> users = new ArrayList<User>();
        User user = new User();
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = "SELECT * FROM users";

        try{
            con = DBConnect.connect();
            stmnt = con.createStatement();
            res = stmnt.executeQuery(query);

            while(res.next()){
                user = new User(res.getInt("id"),res.getString("username"),res.getInt("authlevel"));
                users.add(user);
            }

        }catch (SQLException ex){
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }finally {
            try {
                stmnt.close();
                res.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }

        return new ResponseContext().status(Status.OK).entity(users);
    }

    public ResponseContext login(RequestContext requestContext, JsonNode body) {
        ResponseContext responseContext;

        String password = body.get("password").asText();
        String username = body.get("username").asText();

        if (username.equals(password)) {
            responseContext = new ResponseContext().status(Response.Status.OK);

            //TODO: mockup response
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setUsername(username);
            loginResponse.setUserid(99324);
            loginResponse.setUserRole("GOD");

            responseContext.entity(loginResponse);
        } else {
            responseContext = new ResponseContext().status(Response.Status.FORBIDDEN);
        }

        return responseContext;
    }
}