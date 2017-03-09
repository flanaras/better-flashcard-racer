package se.uu.it.bfcr.inflector.springboot;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 * @author Philip Lanaras
 */
public class UserUtilsTest {

    @Before
    public void setUp() {

    }

    private void assertIntToString(int authLevel, String expected) {
        String authLevelStr = UserUtils.authLevelToString(authLevel);
        assertEquals(expected, authLevelStr);
    }

    private void assertStringToInt(String authLevel, int expected) {
        int authLevelInt = UserUtils.authLevelToInt(authLevel);
        assertEquals(expected, authLevelInt);
    }

    @Test
    public void authLevelToIntWrongEmpty() {
        assertStringToInt("", -1);
    }

    @Test
    public void authLevelToIntWrongSpaces() {
        assertStringToInt("    ", -1);
    }

    @Test
    public void authLevelToIntWrongCombinedName() {
        assertStringToInt("TeacherAdmin", -1);
    }

    @Test
    public void authLevelToIntLowerCase() {
        assertStringToInt("admin", 2);
    }

    @Test
    public void authLevelToIntMixedCase() {
        int authLevelInt = UserUtils.authLevelToInt("TeACher");
        assertEquals(UserUtils.AuthLevels.teacher, UserUtils.authLevelToString(authLevelInt));
    }

    @Test
    public void authLevelToIntStudent() {
        assertStringToInt(UserUtils.AuthLevels.student, 0);
    }

    @Test
    public void authLevelToIntTeacher() {
        assertStringToInt(UserUtils.AuthLevels.teacher, 1);
    }

    @Test
    public void authLevelToIntAdmin() {
        assertStringToInt(UserUtils.AuthLevels.admin, 2);
    }

    @Test
    public void intToAuthLevelWrongIntMinus() {
        assertIntToString(-1, UserUtils.AuthLevels.unknown);
    }

    @Test
    public void intToAuthLevelWrongIntPositive() {
        assertIntToString(123, UserUtils.AuthLevels.unknown);
    }

    @Test
    public void intToAuthLevelWrongIntBorderPositive() {
        assertIntToString(3, UserUtils.AuthLevels.unknown);
    }

    @Test
    public void intToAuthLevelAdmin() {
        assertIntToString(2, UserUtils.AuthLevels.admin);
    }

    @Test
    public void intToAuthLevelStudent() {
        assertIntToString(0, UserUtils.AuthLevels.student);
    }

    @Test
    public void intToAuthLevelTeacher() {
        assertIntToString(1, UserUtils.AuthLevels.teacher);
    }
}
