import React, {Component} from 'react'
import {Link} from "react-router";

export default class DeckConfig extends Component {
    constructor() {
        super()
        this.state = {
            deckType: 'existingDeck'
        }
        this.onDeckTypeChange = this.onDeckTypeChange.bind(this)
    }

    onDeckTypeChange(e) {
        this.setState({deckType: e.target.value})
    }

    render() {
        return (
            <div>
                <h1>Deck configuration</h1>
                <form onChange={this.onDeckTypeChange}>
                    <input type="radio" name="selectType" value="existingDeck" />Choose an existing deck of flashcards<br />
                    <input type="radio" name="selectType" value="generateDeck" />Generate a deck
                </form>
                <ExistingDeck onDeckChange={this.props.onDeckChange} decks={this.props.decks} deckType={this.state.deckType}/>
                <GenerateDeckOptions />
                <Link to="playgame" >Play game</Link>
            </div>
        )
    }
}

export class ExistingDeck extends Component {
    render() {
        return this.props.deckType === 'existingDeck' ? (
            <div>
                <select onChange={event => this.props.onDeckChange(event.target.value)}>
                    {
                        this.props.decks.map((deck, index) => (
                                <option key={index} value={deck.id}>{deck.desc}</option>
                            )
                        )
                    }
                </select>
            </div>
        ) : null
    }
}

export class GenerateDeckOptions extends Component {
    constructor() {
        super()
        this.state = {
            generatorConfig: {
                operators: {
                    add: true,
                    sub: true,
                    mult: false,
                    div: false
                }
            }

        }
    }



    render() {
        return (
            <div>
                <form>
                    <input type="checkbox" checked={this.state.add === true ? 'true' : 'false'} value="add" />Addition <br />
                    <input type="checkbox" checked={this.state.sub === true ? 'true' : 'false'} value="sub" />Subtraction <br />
                    <input type="checkbox" checked={this.state.mult === true ? 'true' : 'false'} value="mult" />Multiplicaiton <br />
                    <input type="checkbox" checked={this.state.div === true ? 'true' : 'false'} value="div" />Division <br />
                    <input type="radio" name="gameType" value="time" /> Time
                    <input type="radio" name="gameType" value="numberOfProblems" /> # Problems
                    <h3>Number range</h3>
                    <input type="text" value='min' />Min
                    <input type="text" value='max' />Max
                </form>
            </div>
        )
    }
}