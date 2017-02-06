import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";

export default class DeckConfig extends Component {
    constructor() {
        super()
        this.state = {
            deckType: 'savedDeck',
            decks: ['Placeholder deck'],
            chosenDeck: 'some place',
            generateDeck: {
                operators: {
                    add: true,
                    sub: true,
                    mult: false,
                    div: false
                },
                operandRange: {
                    min: -10,
                    max: 100
                }
            },
            gameType: 'timeGame',
            gameLength: 30
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeGenerateDeck = this.handleChangeGenerateDeck.bind(this)
        this.submitGameConfig = this.submitGameConfig.bind(this)
        this.apiCall = this.apiCall.bind(this)
    }

    componentDidMount() {
        this.apiCall('decks')
    }

    async apiCall(endpoint) {
        const url = `${config.mock_api_url}/${endpoint}`
        const decks = await LoadJson(url)
        this.setState({decks})
        this.setState({chosenDeck: decks[0]})
        console.log(decks)
    }

    handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        // if dropdown being changed
        if(e.target.type === 'select-one') {
            const chosenDeck = this.state.decks.find( deck => parseInt(deck.id) === parseInt(value))
            this.setState({chosenDeck})
        } else {
            this.setState({[name]: value})
        }
    }

    handleChangeGenerateDeck(e) {
        const isOperator =  e.target.type === 'checkbox'
        const value = isOperator ? e.target.checked : e.target.value
        const name = e.target.name
        let generateDeck = this.state.generateDeck
        if(isOperator) {
            generateDeck.operators[name] = value
            this.setState({generateDeck})
        } else {
            generateDeck.operandRange[name] = value
            this.setState({generateDeck})
        }
    }

    submitGameConfig(e) {
        e.preventDefault()
        const deckType = this.state.deckType
        if(deckType === 'savedDeck') {
            this.props.onSubmitGameConfig(this.state.chosenDeck, this.state.gameType, this.state.gameLength)
        } else {
            // TODO: Fetch the generated deck and send it to MotherOfDragons. For now, use existing deck
            this.props.onSubmitGameConfig(this.state.chosenDeck, this.state.gameType, this.state.gameLength)
        }
    }

    render() {
        return (
            <div>
                <h1>Game configuration</h1>
                <form onSubmit={this.submitGameConfig} >
                    <input type="radio" name="deckType" value="savedDeck" checked={this.state.deckType === 'savedDeck'} onChange={this.handleChange} />Choose an existing deck of flashcards<br />
                    <input type="radio" name="deckType" value="generateDeck" checked={this.state.deckType === 'generateDeck'} onChange={this.handleChange} />Generate a deck
                    <ExistingDeck handleChange={this.handleChange} decks={this.state.decks} deckType={this.state.deckType} chosenDeck={this.state.chosenDeck}/>
                    <GenerateDeckOptions handleChangeGenerateDeck={this.handleChangeGenerateDeck} deckType={this.state.deckType} generateDeck={this.state.generateDeck}/>
                    <h4>Game length</h4>
                    <input type="radio" name="gameType" value="timeGame" checked={this.state.gameType === 'timeGame'}  onChange={this.handleChange} /> Time in seconds
                    <input type="radio" name="gameType" value="problemGame" checked={this.state.gameType === 'problemGame'}  onChange={this.handleChange} /> Number of problems <br />
                    <input type="text" name="gameLength" value={this.state.gameLength} onChange={this.handleChange} /> game length <br />
                    <input type="submit" value="Start Game"/>
                </form>
            </div>
        )
    }
}


export class ExistingDeck extends Component {
    render() {
        return this.props.deckType === 'savedDeck' ? (
                <div>
                    <select value={this.props.chosenDeck.id} onChange={this.props.handleChange}>
                        {
                            this.props.decks.map((deck, index) => (
                                    <option key={index} value={deck.id}>{deck.description}</option>
                                )
                            )
                        }
                    </select>
                </div>
            ) : null
    }
}


export class GenerateDeckOptions extends Component {
    render() {
        return  this.props.deckType === 'generateDeck' ? (
                <div>
                    <input type="checkbox" name="add" checked={this.props.generateDeck.operators.add} onChange={this.props.handleChangeGenerateDeck}/>Addition <br />
                    <input type="checkbox" name="sub" checked={this.props.generateDeck.operators.sub} onChange={this.props.handleChangeGenerateDeck}/>Subtraction <br />
                    <input type="checkbox" name="mult" checked={this.props.generateDeck.operators.mult} onChange={this.props.handleChangeGenerateDeck}/>Multiplication <br />
                    <input type="checkbox" name="div" checked={this.props.generateDeck.operators.div} onChange={this.props.handleChangeGenerateDeck}/>Division <br />
                    <h4>Number range</h4>
                    <input type="text" name="min" value={this.props.generateDeck.operandRange.min} onChange={this.props.handleChangeGenerateDeck}/>Min
                    <input type="text" name="max" value={this.props.generateDeck.operandRange.max} onChange={this.props.handleChangeGenerateDeck}/>Max
                </div>
            ) : null
    }
}