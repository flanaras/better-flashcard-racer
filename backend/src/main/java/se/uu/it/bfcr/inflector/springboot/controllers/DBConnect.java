import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnect {

    public Connection connect() throws SQLException {
        Connection conn = null;
        Properties connectionProps = new Properties();
        String username = "user=java";
        String password = "password=lordofgeese1997";

        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception ex) {
            System.out.print("Error loading MySQL driver.\n");
        }

        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/" + username + "&" + password);

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }

        return conn;
    }
}