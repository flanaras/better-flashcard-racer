package se.uu.it.bfcr.inflector.springboot.models;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Created by Asa on 2/6/2017.
 */
public class FlashcardTest {
    private Flashcard fc1;

    @Before
    public void setUp() {
        //function to be called before each test case
    }

    @Test
    public void testEmptyFlashcard() {
        fc1 = new Flashcard();

        assertNotNull(fc1);
        assertNull(fc1.getProblem());
        assertNull(fc1.getAnswer());
        assertEquals(0, fc1.getId());
    }

    @Test
    public void testFlashcardProperty() {
        fc1 = new Flashcard();

        fc1.setAnswer("3");
        fc1.setId(1);
        fc1.setProblem("1+2");

        assertNotNull(fc1);
        assertEquals(1, fc1.getId());
        assertEquals("3", fc1.getAnswer());
        assertEquals("1+2", fc1.getProblem());

    }

    @Test
    public void testManyCharactersString() {
        fc1 = new Flashcard(2, "1-1", "0");

        assertNotNull(fc1);
        assertTrue(fc1 instanceof Flashcard);
    }

    @After
    public void cleanUp() {
        //function to be run after each test case
    }
}
