package se.uu.it.bfcr.inflector.springboot.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnect {

    public static Connection connect() throws SQLException {
        Connection conn = null;
        String url = "jdbc:mysql://localhost:3306/flashcardracer";
        String username = "java";
        String password = "lordofgeese1997";


        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception ex) {
            System.out.print("Error loading MySQL driver.\n");
        }

        try {
//            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/" + username + "&" + password);
        	conn = DriverManager.getConnection(url, username, password);

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }

        return conn;
    }
}