package se.uu.it.bfcr.inflector.springboot.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.AuthLevel;
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
 * @author Michael Wijaya Saputra
 */
@Component
public class UserController {
    public ResponseContext getUserById(RequestContext requestContext, Long id) throws SQLException {
        User user = new User();
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = "SELECT * FROM users WHERE users.ID = " + id;

        try {
            con = DBConnect.connect();
            stmnt = con.createStatement();
            res = stmnt.executeQuery(query);

            res.first();
            user = new User(res.getInt("id"), res.getString("username"), res.getInt("authlevel"));

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                stmnt.close();
                res.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }
        return new ResponseContext().status(Status.OK).entity(user);
    }

    public ResponseContext getUsers(RequestContext requestContext) throws SQLException {
        ArrayList<User> users = new ArrayList<User>();
        User user = new User();
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = "SELECT * FROM users";

        try {
            con = DBConnect.connect();
            stmnt = con.createStatement();
            res = stmnt.executeQuery(query);

            while (res.next()) {
                user = new User(res.getInt("id"), res.getString("username"), res.getInt("authlevel"));
                users.add(user);
            }

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                stmnt.close();
                res.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }

        return new ResponseContext().status(Status.OK).entity(users);
    }

    public ResponseContext addUser(RequestContext requestContext, JsonNode body) {
        Connection con = null;
        Statement stmnt = null;

        String password = body.get("password").asText();
        String username = body.get("username").asText();
        Long auth_level = body.get("auth_level").asLong();

        String query = "INSERT INTO users (username,password,authlevel) VALUES('" + username + "','" + password + "','" + auth_level + "')";

        try {
            con = DBConnect.connect();
            stmnt = con.createStatement();
            stmnt.executeUpdate(query);

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                stmnt.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }

        return new ResponseContext().status(Status.OK);
    }

    public ResponseContext deleteUser(RequestContext requestContext, Long id) {
        Connection con = null;
        Statement stmnt = null;
        String query = "DELETE FROM users WHERE users.ID = " + id;

        try {
            con = DBConnect.connect();
            stmnt = con.createStatement();
            stmnt.executeUpdate(query);

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                stmnt.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }
        return new ResponseContext().status(Status.OK);
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

    public ResponseContext getUsersAuth(RequestContext requestContext) throws SQLException {
        ArrayList<AuthLevel> userAuth = new ArrayList<AuthLevel>();
        AuthLevel auth = null;
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = "SELECT authlevel FROM users GROUP BY authlevel";

        try {
            con = DBConnect.connect();
            stmnt = con.createStatement();
            res = stmnt.executeQuery(query);

            while (res.next()) {
                if (res.getInt("authlevel") == 0) {
                    auth = new AuthLevel(0, "Student");
                } else if (res.getInt("authlevel") == 1) {
                    auth = new AuthLevel(1, "Teacher");
                } else if (res.getInt("authlevel") == 2) {
                    auth = new AuthLevel(2, "Admin");
                }
                userAuth.add(auth);
            }

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                stmnt.close();
                res.close();
                con.close();
            } catch (SQLException ex) {/*ignore*/}
        }

        return new ResponseContext().status(Status.OK).entity(userAuth);
    }

    public ResponseContext updateUserById(RequestContext requestContext,Long id,JsonNode users) throws SQLException {
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        User user = new User();
        int i = 0;
        //System.out.println(id);
        //System.out.println(users.get("password").asText());
        try
        {

            ObjectMapper mapper = new ObjectMapper();
            user = mapper.treeToValue(users,User.class);
            String auth_level = "";
            if(user.getAuth_level().equals("admin")){
                auth_level = "2";
            }else if(user.getAuth_level().equals("teacher")){
                auth_level = "1";
            } else{
                auth_level = "0";
            }
            String query = "Update users set username = '"+user.getUsername()+"', password = '"+user.getPassword()+"', authlevel = '"+auth_level+"' WHERE users.ID = " + id;
           /* System.out.println(users.get("password").asText());
            String auth_level = "";
            if(users.get("auth_level").asText().equals("admin")){
                auth_level = "2";
            }else if(users.get("auth_level").asText().equals("teacher")){
                auth_level = "1";
            } else{
                auth_level = "0";
            }
            String query = "Update user set username = '"+users.get("username").asText()+"', password = '"+users.get("password").asText()+"', authlevel = '"+auth_level+"' WHERE users.ID = " + id;*/
            con = DBConnect.connect();
            stmnt = con.createStatement();
            i  = stmnt.executeUpdate(query) ;
            System.out.println(i);


        }
        catch (SQLException ex)
        {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } finally
        {
            stmnt.close();
            con.close();
        }


        if(i > 0) {
           return new ResponseContext().status(Status.OK);
        }
        else
        {
            return new ResponseContext().status(Status.NOT_MODIFIED);
        }
    }
}