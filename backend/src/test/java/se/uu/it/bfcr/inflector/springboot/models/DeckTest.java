package se.uu.it.bfcr.inflector.springboot.models;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Created by Asa on 2/6/2017.
 */
public class DeckTest {
    private Deck deck1, deck2, deck3;
    private List<Flashcard> cards;
    private String created;

    @Before
    public void setUp() {
        //function to be called before each test case

    }

    @Test
    public void testEmptyDeck() {
        deck1 = new Deck();

        assertNotNull(deck1);
        assertTrue(deck1.getFlashcard().isEmpty());
        assertNull(deck1.getChanged());
        assertNull(deck1.getCreated());
        assertNull(deck1.getDescription());
        assertEquals(0, deck1.getId());
        assertNull(deck1.getIsPrivate());
        assertNull(deck1.getName());
        assertNull(deck1.getUserName());
        assertEquals(0, deck1.getNumProblems());
        assertEquals(0, deck1.getUserId());
    }

    @Test
    public void testDeskProperty() {
        deck2 = new Deck();
        created = OffsetDateTime.now().toString();
        cards = new ArrayList<Flashcard>();
        cards.add(new Flashcard(1, "1+3", "4"));
        cards.add(new Flashcard(1, "2+3", "5"));
        cards.add(new Flashcard(1, "3+4", "7"));
        cards.add(new Flashcard(1, "5+0", "5"));
        cards.add(new Flashcard(1, "6-2", "4"));
        deck2.setUserId(1);
        deck2.setFlashcard(cards);
        deck2.setName("test");
        deck2.setCreated(created);
        deck2.setChanged(created);
        deck2.setDescription("simple description");
        deck2.setId(1);
        deck2.setIsPrivate(false);
        deck2.setNumProblems(5);
        deck2.setUserName("Teacher1");

        assertNotNull(deck2);
        assertEquals(5, deck2.getNumProblems());
        assertEquals(1, deck2.getUserId());
        assertEquals(1, deck2.getId());
        assertEquals(deck2.getFlashcard(), cards);
        assertEquals(deck2.getName(), "test");
        assertEquals(deck2.getDescription(), "simple description");
        assertEquals(deck2.getChanged(), deck2.getCreated());
        assertEquals(deck2.getUserName(), "Teacher1");
        assertFalse(deck2.getIsPrivate());

    }

    @Test
    public void testReadyDeck(){
        deck3 = new Deck(1, 15, "test", "simple description", 1, "Teacher1", created, created, false, cards);

        assertNotNull(deck3);
        assertTrue(deck3 instanceof Deck);
    }

    @After
    public void cleanUp() {
        //function to be run after each test case
    }
}
