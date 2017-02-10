package backend.src.main.java.se.uu.it.bfcr.inflector.springboot.controllers;

import com.sun.xml.internal.ws.client.ResponseContext;
import backend.src.main.java.se.uu.it.bfcr.inflector.springboot.models.User;

/**
 * Created by Bartok on 2/9/17.
 */
public class UserController {
    public ResponseContext getUserById(int id){

        User user = new User(0,"a",0);
        //...
        return new ResponseContext().status(status.OK).entity(null);
    }

    public ResponseContext getUsers(){


        //..
        return new ResponseContext().status(status.OK).entity(null);
    }
}