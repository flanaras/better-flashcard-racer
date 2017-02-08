package backend.src.main.java.se.uu.it.bfcr.inflector.springboot.controllers;

/**
 * Created by Bartok on 2/8/17.
 */
import com.sun.xml.internal.ws.client.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import se.uu.it.bfcr.inflector.springboot.models.User;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class UsersController {

    public ResponseContext getUsers() throws SQLException{
        Connection con = null;
        List<User> users = new ArrayList<User>();

        try {
            con = DBConnect.connect();
            PreparedStatement stmnt = con.prepareStatement("SELECT * FROM users;");


        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.println("Something went wrong when closing the MySQL-connection");
            }
        }

        return new ResponseContext().status(status.OK).entity(users);
    }
}
