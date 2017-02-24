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

        return new ResponseContext().status(Status.CREATED);
    }

    public ResponseContext deleteUserById(RequestContext requestContext, Long id) {
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
        return new ResponseContext().status(Status.NO_CONTENT);
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

    public ResponseContext getUsersAuth(RequestContext requestContext, Long id) throws SQLException {
        ArrayList<AuthLevel> userAuth = new ArrayList<AuthLevel>();
        AuthLevel auth = null;
        Connection con = null;
        Statement stmnt = null;
        ResultSet res = null;
        String query = null;
        if(id == 2){
            query = "SELECT authlevel FROM users GROUP BY authlevel";
        } else if(id == 1){
            query = "SELECT authlevel FROM users WHERE authlevel < 1 GROUP BY authlevel";
        } else{
            return new ResponseContext().status(Status.NO_CONTENT);
        }


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
        User user = new User();

        int i = 0;

        try
        {

            PreparedStatement updateUsers = null;
            ObjectMapper mapper = new ObjectMapper();
            user = mapper.treeToValue(users,User.class);
            String updatesUserStrings = "";

            con = DBConnect.connect();
            if(user.getPassword() != null)
            {
                updatesUserStrings = "UPDATE users set username = ?, password = ?, authlevel = ? where users.ID = ?";
                updateUsers = con.prepareStatement(updatesUserStrings);
                updateUsers.setString(1, user.getUsername());
                updateUsers.setString(2, user.getPassword());
                updateUsers.setInt(3, Integer.parseInt(user.getAuth_level()));
                updateUsers.setLong(4, id);
            }
            else
            {
                updatesUserStrings = "UPDATE users set username = ?,authlevel = ? where users.ID = ?";
                updateUsers = con.prepareStatement(updatesUserStrings);
                updateUsers.setString(1, user.getUsername());
                updateUsers.setInt(2, Integer.parseInt(user.getAuth_level()));
                updateUsers.setLong(3, id);
            }

            i  = updateUsers.executeUpdate() ; 
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