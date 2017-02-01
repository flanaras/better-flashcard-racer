package se.uu.it.bfcr.test;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by philip on 01/02/17.
 */
public class ToBeTestedTest {

    private ToBeTested foo;

    @Before
    public void setUp() {
        //function to be called before each test case
        foo = new ToBeTested();
    }

    @Test
    public void testEmptyString() {
        foo = new ToBeTested();

        assertEquals(0, foo.getLength(""));
    }

    @Test
    public void testOneCharacterString() {
        foo = new ToBeTested();

        assertEquals(1, foo.getLength("b"));
    }

    @Test
    public void testManyCharactersString() {
        foo = new ToBeTested();

        assertEquals(17, foo.getLength("lalalalalalalalal"));
    }

    @After
    public void cleanUp() {
        //function to be run after each test case
    }

}

