/*
 *  Copyright 2016 SmartBear Software
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package se.uu.it.bfcr.inflector.springboot.controllers;

import com.github.javafaker.Faker;
import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.Deck;
import se.uu.it.bfcr.inflector.springboot.models.Flashcard;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response.Status;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DeckController {

//    Faker faker = new Faker();

    public ResponseContext getDecks(RequestContext requestContext, Long user_id)
    {
    	List<Flashcard> cards = new ArrayList<Flashcard>();
    	cards.add(new Flashcard(1, "1+3", "4"));
    	cards.add(new Flashcard(1, "2+3", "5"));
    	cards.add(new Flashcard(1, "3+4", "7"));
    	cards.add(new Flashcard(1, "5+0", "5"));
    	cards.add(new Flashcard(1, "6-2", "4"));
        Deck deck = new Deck();
        deck.setUserId(user_id);
        deck.setFlashcard(cards);
        deck.setName("test");
        deck.setCreated(OffsetDateTime.now().toString());
        deck.setChanged(OffsetDateTime.now().toString());
        deck.setDescription("simple description");
        deck.setId(1);
        deck.setIsPrivate(false);
        deck.setNumProblems(5);
        deck.setUserName("Teacher1");
        return new ResponseContext().status(Status.OK)
                                    .entity(deck);
    }

    
}
