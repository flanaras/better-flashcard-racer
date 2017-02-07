package se.uu.it.bfcr.inflector.springboot.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * @author Philip Lanaras
 */
public class DBConnect {

    public static Connection connect() throws SQLException {
        Connection conn = null;
        String url = "jdbc:mysql://localhost:3306/flashcardracer";
        String username = "java";
        String password = "lordofgeese1997";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (Exception ex) {
            System.out.print("Error loading MySQL driver.\n");
        }

        try {
<<<<<<< 99db36fb97f69a7ff4ea0cb50b5148307a5e196d
            conn = DriverManager.getConnection(url, username, password);
=======
//            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/" + username + "&" + password);
        	conn = DriverManager.getConnection(url, username, password);

>>>>>>> fixing database connection, better-flashcard-racer/lib/mysql-connector-java-6.0.5.jar should be added into project, add mysql dependency in gradle
        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }

        return conn;
    }
}