import React, {Component} from 'react'
import {Link} from "react-router";

export default class DeckConfig extends Component {
    constructor() {
        super()
        this.state = {
            hideGenerate: true
        }
        this.onDeckTypeChange = this.onDeckTypeChange.bind(this)
    }

    onDeckTypeChange(e) {
        console.log(e.target.value)
        console.log("hide generate: " + (e.target.value === 'existingDeck'))
        this.setState({showGenerate: e.target.value === 'existingDeck'})
    }

    render() {
        return (
            <div>
                <h1>Deck configuration</h1>
                <form onChange={this.onDeckTypeChange}>
                    <input type="radio" name="selectType" value="existingDeck" />Choose an existing deck of flashcards<br />
                    <input type="radio" name="selectType" value="generateDeck" />Generate a deck
                </form>
                <select onChange={event => this.props.onDeckChange(event.target.value)}>
                    {
                        this.props.decks.map((deck, index) => (
                            <option key={index} value={deck.id}>{deck.desc}</option>
                            )
                        )
                    }
                </select>
                <Link to="playgame" >Play game</Link>
            </div>
        )
    }
}

