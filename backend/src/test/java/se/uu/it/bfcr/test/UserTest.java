package backend.src.test.java.se.uu.it.bfcr.test;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import se.uu.it.bfcr.inflector.springboot.models.User;

import static org.junit.Assert.*;

/**
 * Created by Bartok on 2/19/17.
 */
public class UserTest {

    @Before
    public void setUp(){

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

    @After
    public void cleanUp(){

    }

}
