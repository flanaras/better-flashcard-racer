package backend.src.test.java.se.uu.it.bfcr.test;

import com.sun.xml.internal.ws.client.RequestContext;
import com.sun.xml.internal.ws.client.ResponseContext;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import se.uu.it.bfcr.inflector.springboot.models.User;
import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import se.uu.it.bfcr.inflector.springboot.controllers.UserController;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.Assert.*;

/**
 * Created by Bartok on 2/19/17.
 */
public class UserTest {
    public boolean hasConnectedDatabase;

    @Before
    public void setUp() throws SQLException{
        hasConnectedDatabase = true;
        Connection conn;

        try {
            conn = DBConnect.connect();
        } catch (SQLException ex) {
            hasConnectedDatabase = false;
        }

    }

    @Test
    public void constructorTests(){
        User testUserEmpty = new User();
        User testUser = new User(12,"Johnsson",1);

        assertEquals(testUserEmpty.getUsername(),"Default");
        assertEquals(testUserEmpty.getId(),0);
        assertEquals(testUserEmpty.getAuth_level(),"student");
        assertEquals(testUser.getId(),12);
        assertEquals(testUser.getUsername(),"Johnsson");
        assertEquals(testUser.getAuth_level(),"teacher");
    }

    @Test
    public void accessTests(){
        if(hasConnectedDatabase){
            User testUser = new User(12,"Johnsson",1);
            RequestContext requestContext;
            //make em happens...
            ResponseContext responseContext = UserController.addUser(requestContext);
            assertEquals(1,1);
            //...make tests...
        }
    }

    @After
    public void cleanUp(){

    }

}
