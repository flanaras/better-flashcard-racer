package se.uu.it.bfcr.inflector.springboot.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.LoginResponse;
import se.uu.it.bfcr.inflector.springboot.models.User;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.sql.*;
import java.util.ArrayList;
import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import org.springframework.stereotype.Component;

import static se.uu.it.bfcr.inflector.springboot.UserUtils.authenticateUser;

/**
 * Created by Bartok on 2/9/17.
 * @author Philip Lanaras
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

        LoginResponse loginResponse = authenticateUser(password, username);

        if (loginResponse != null) {
            responseContext = new ResponseContext().status(Response.Status.OK);
            responseContext.entity(loginResponse);
        } else {
            responseContext = new ResponseContext().status(Response.Status.FORBIDDEN);
        }

        return responseContext;
    }

}