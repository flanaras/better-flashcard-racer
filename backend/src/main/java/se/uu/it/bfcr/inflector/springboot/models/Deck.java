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

package se.uu.it.bfcr.inflector.springboot.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


public class Deck {
    private long id;
    private long numProblems;
    private String name;
    private String description;
    private long user_id; 
    private String user_name;
    private String created;
    private String changed;
    private Boolean is_private;
    private List<Flashcard> cards = new ArrayList<Flashcard>();
    

    @JsonProperty
    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    @JsonProperty
    public String getChanged() {
        return changed;
    }
    
    public void setChanged(String changed) {
        this.changed = changed;
    }
    
    @JsonProperty
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonProperty
    public long getNumProblems() {
        return numProblems;
    }

    public void setNumProblems(long numProblems) {
        this.numProblems = numProblems;
    }
    
    @JsonProperty
    public long getUserId() {
        return user_id;
    }

    public void setUserId(long user_id) {
        this.user_id = user_id;
    }


    @JsonProperty("flashcard")
    public List<Flashcard> getFlashcard() {
        return cards;
    }

    public void setFlashcard(List<Flashcard> cards) {
        this.cards = cards;
    }

    @JsonProperty
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    @JsonProperty
    public String getUserName() {
        return user_name;
    }

    public void setUserName(String user_name) {
        this.user_name = user_name;
    }    
    
    @JsonProperty
    public Boolean getIsPrivate() {
        return is_private;
    }

    public void setIsPrivate(Boolean is_private) {
        this.is_private = is_private;
    }    
    
    @JsonProperty
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public Deck() {

    }

    public Deck(long id, long numProblems, String name, String description, long user_id, String user_name, String created, String changed, Boolean is_private, List<Flashcard> cards) {
        this.id = id;
        this.numProblems = numProblems;
        this.name = name;
        this.description = description;
        this.user_id = user_id;
        this.user_name = user_name;
        this.created = created;
        this.changed = changed;
        this.is_private = is_private;
        this.cards = cards;
    }
}
