package se.uu.it.bfcr.inflector.springboot;

import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import se.uu.it.bfcr.inflector.springboot.models.LoginResponse;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Philip Lanaras
 * @author Asa
 */
public class UserUtils {
    public static LoginResponse authenticateUser(String password, String username) {
        LoginResponse loginResponse = null;
        try (Connection connection = DBConnect.connect()) {
            PreparedStatement preparedStatement;
            String sqlQuery = "SELECT id, username, authlevel " +
                    "FROM users " +
                    "WHERE username = ? AND password = ?";
            ResultSet res;

            preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            res = preparedStatement.executeQuery();

            if (res.next()) {
                if (res.getInt("is_login") == 0) {
                    loginResponse = new LoginResponse();
                    loginResponse.setUsername(res.getString("username"));
                    loginResponse.setUserid(res.getInt("id"));
                    loginResponse.setUserRole(UserUtils.authLevelToString(res.getInt("authlevel")));
                    loginResponse.setAuthId(res.getInt("authlevel"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {

        }
        return loginResponse;
    }

    public static String authLevelToString(int authLevel) {
        if (authLevel == 0) {
            return AuthLevels.student;
        } else if (authLevel == 1) {
            return AuthLevels.teacher;
        } else if (authLevel == 2) {
            return AuthLevels.admin;
        }
        return AuthLevels.unknown;
    }

    class AuthLevels {
        static final String student = "student";
        static final String teacher = "teacher";
        static final String admin = "admin";
        static final String unknown = "unknown_auth_level";
    }

    public static int authLevelToInt(String authLevel) {
        if (authLevel.toLowerCase().equals(AuthLevels.student)) {
            return 0;
        } else if (authLevel.toLowerCase().equals(AuthLevels.teacher)) {
            return 1;
        } else if (authLevel.toLowerCase().equals(AuthLevels.admin)) {
            return 2;
        }

        return -1;
    }
}
