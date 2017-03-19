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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.inflector.models.RequestContext;
import io.swagger.inflector.models.ResponseContext;
import se.uu.it.bfcr.inflector.springboot.models.Deck;
import se.uu.it.bfcr.inflector.springboot.models.Flashcard;
import se.uu.it.bfcr.inflector.springboot.models.GenerateCarding;
import org.springframework.stereotype.Component;
import se.uu.it.bfcr.inflector.springboot.models.OperandGenerate;

import javax.ws.rs.core.Response.Status;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Ilona Asa
 * @author Philip Lanaras
 * @author michael
 */

@Component
public class DeckController {
    private Connection con = null;
    private String selectCards = "SELECT card.id as card_id, problem, solution FROM deck_card_dep, card where deck_card_dep.card_id=card.id AND deck_card_dep.deck_id = ?";
    private List<Deck> decksList = new ArrayList<Deck>();

    public List<Deck> populateDeck(ResultSet rs) throws SQLException{
        PreparedStatement preparedStm2 = null;
        List<Deck> decks = new ArrayList<Deck>();
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
        return decks;
    }

    public ResponseContext getDecks(RequestContext requestContext) throws SQLException {
        PreparedStatement preparedStm1 = null;
        
        try {
            con = DBConnect.connect();
            String selectDecks = "SELECT COUNT(*) as num_problem, decks.id as id, decks.name, decks.description, decks.difficulty, decks.private, decks.created, decks.changed, users.id as user_id, users.username FROM `decks`, users, deck_card_dep where decks.created_by = users.id AND decks.id=deck_card_dep.deck_id GROUP BY deck_card_dep.deck_id";
            preparedStm1 = con.prepareStatement(selectDecks);

            ResultSet rs = preparedStm1.executeQuery();
            decksList = populateDeck(rs);
            
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
                                    .entity(decksList);
    }

    public ResponseContext getDeckById(RequestContext requestContext, Long id) throws SQLException {
        PreparedStatement preparedStm1 = null;

        try {
            con = DBConnect.connect();
            String selectDecks = "SELECT COUNT(*) as num_problem, decks.id as id, decks.name, decks.description, decks.difficulty, decks.private, decks.created, decks.changed, users.id as user_id, users.username FROM `decks`, users, deck_card_dep where decks.created_by = users.id AND decks.id=deck_card_dep.deck_id AND decks.id = ? GROUP BY deck_card_dep.deck_id";

            preparedStm1 = con.prepareStatement(selectDecks);
            preparedStm1.setInt(1, id.intValue());
            ResultSet rs = preparedStm1.executeQuery();

            decksList = populateDeck(rs);

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
                .entity(decksList);
    }


    public ResponseContext generateCards(RequestContext requestContext, JsonNode genDecks) {
        Deck deck = new Deck();
        try {
            ObjectMapper mapper = new ObjectMapper();
            GenerateCarding genCard = mapper.treeToValue(genDecks, GenerateCarding.class);

            List<Flashcard> cards = new ArrayList<>();

            for (int i = 0; i < genCard.getNumberSolution(); i++) {
                cards.add(genCard.generateCard());
            }



            deck.setUserId(9999);
            deck.setFlashcard(cards);
            deck.setName("PraticeDeck");
            deck.setCreated(OffsetDateTime.now().toString());
            deck.setChanged(OffsetDateTime.now().toString());
            deck.setDescription("Deck created by request of user");
            deck.setId(99999);
            deck.setIsPrivate(false);
            deck.setNumProblems(genCard.getNumberSolution());
            deck.setUserName("NN");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


        return new ResponseContext().status(Status.OK)
                .entity(deck);
    }


    public static List<Integer> randomNumber(int min,int max) {
        List<Integer>randNumb = new ArrayList<>();
        int i =0 ;
        for(i = 0 ; i<2;i++)
        {
            Random rand = new Random();
            randNumb.add(rand.nextInt((max - min)+1)+min);
        }

        return  randNumb;
    }

    public static int calculateTotal(int operandA, int operandB, String operator) {
        if (operator.equals("+")) {
            return operandA + operandB;
        } else if (operator.equals("-")) {
            return operandA - operandB;
        } else if (operator.equals("X")) {
            return operandA * operandB;
        } else {
            return operandA / operandB;
        }
    }

    public static List<String> mappingOperand(OperandGenerate operand) {
        List<String> operands = new ArrayList<>();

        if (operand.isAdd()) {
            operands.add("+");
        }

        if (operand.isMinus()) {
            operands.add("-");
        }

        if (operand.isMulti()) {
            operands.add("X");
        }

        if (operand.isDiv()) {
            operands.add("/");
        }

        return operands;
    }
}
