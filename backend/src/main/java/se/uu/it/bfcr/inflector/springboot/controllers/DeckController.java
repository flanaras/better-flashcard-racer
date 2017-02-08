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

import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.Deck;
import se.uu.it.bfcr.inflector.springboot.models.Flashcard;
import se.uu.it.bfcr.inflector.springboot.controllers.DBConnect;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response.Status;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DeckController {

    public ResponseContext getDecks(RequestContext requestContext) throws SQLException {
    	//put some query here
        Connection con = null;
        PreparedStatement preparedStm1 = null, preparedStm2 = null;
        List<Deck> decks = new ArrayList<Deck>();
        
        try {
            con = DBConnect.connect();
            String selectDecks = "SELECT COUNT(*) as num_problem, decks.id as id, decks.name, decks.description, decks.difficulty, decks.private, decks.created, decks.changed, users.id as user_id, users.username FROM `decks`, users, deck_card_dep where decks.created_by = users.id AND decks.id=deck_card_dep.deck_id GROUP BY deck_card_dep.deck_id";
            String selectCards = "SELECT card.id as card_id, problem, solution FROM deck_card_dep, card where deck_card_dep.card_id=card.id AND deck_card_dep.deck_id = ?";
            
            preparedStm1 = con.prepareStatement(selectDecks);
            ResultSet rs = preparedStm1.executeQuery();

			while (rs.next()) {
				Deck deck = new Deck();
				deck.setUserId(rs.getInt("user_id"));
		        deck.setName(rs.getString("name"));
		        deck.setCreated(rs.getString("created"));
		        deck.setChanged(rs.getString("changed"));
		        deck.setDescription(rs.getString("description"));
		        deck.setId(rs.getInt("id"));
		        if(rs.getInt("user_id") == 0){
		        	deck.setIsPrivate(false);
		        }else {
		        	deck.setIsPrivate(true);
		        }
		        deck.setNumProblems(rs.getInt("num_problem"));
		        deck.setUserName(rs.getString("username"));
		        
				preparedStm2 = con.prepareStatement(selectCards);
				preparedStm2.setInt(1, rs.getInt("id"));
				ResultSet rsCards = preparedStm2.executeQuery();
				
				List<Flashcard> cards = new ArrayList<Flashcard>();
				while (rsCards.next()) {
					Flashcard card = new Flashcard();
					card.setId(rsCards.getInt("card_id"));
					card.setProblem(rsCards.getString("problem"));
					card.setAnswer(rsCards.getString("solution"));
					cards.add(card);
				}
				
				deck.setFlashcard(cards);
				
				decks.add(deck);
			}
            
        } catch (SQLException ex) {
            Logger.getLogger(DeckController.class.getName()).log(Level.SEVERE,
                null, ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                Logger.getLogger(DeckController.class.getName()).log(
                    Level.SEVERE, null, ex);
            }
        }

        return new ResponseContext().status(Status.OK)
                                    .entity(decks);
    }

    
}
