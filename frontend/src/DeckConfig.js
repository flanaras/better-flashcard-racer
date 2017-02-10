import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";

export default class DeckConfig extends Component {
    constructor() {
        super()
        this.state = {
            deckType: 'generateDeck',
            decks: ['Placeholder deck'],
            chosenDeck: 'placeholder',
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
            gameLengthProblems: '30',
            timePerProblem: '10',
            showTooBigInput: false
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
    }

    handleChange(e) {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        const isGameLengthChange = name === 'gameLengthProblems'
        const isSavedDeckChange = e.target.type === 'select-one'
        const isDeckTypeChange = name === 'deckType'
        // if dropdown being changed
        if(isSavedDeckChange) {
            const chosenDeck = this.state.decks.find( deck => parseInt(deck.id) === parseInt(value))
            this.setState({chosenDeck})
        } else {
            if(isGameLengthChange && this.state.deckType === 'savedDeck') {
                let gameLengthProblems, showTooBigInput
                ({gameLengthProblems, showTooBigInput} = this.validateGameLength(value, this.state.chosenDeck, name))
                this.setState({gameLengthProblems, showTooBigInput})
            } else if(isDeckTypeChange && this.state.deckType === 'generateDeck') {
                let gameLengthProblems, showTooBigInput
                ({gameLengthProblems, showTooBigInput} = this.validateGameLength(this.state.chosenDeck.flashcards.length, this.state.chosenDeck, 'gameLengthProblems'))
                this.setState({[name]: value, gameLengthProblems, showTooBigInput})
            } else {
            this.setState({[name]: value, showTooBigInput: false})
        }
    }
}

validateGameLength(value, chosenDeck, name) {
    const gameLengthState = value > chosenDeck.flashcards.length ?
        {[name]: this.state.chosenDeck.flashcards.length, showTooBigInput: true} :
        {[name]: value, showTooBigInput: false}
    return gameLengthState
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
        this.props.onSubmitGameConfig(this.state.chosenDeck, this.state.gameLengthProblems, this.state.timePerProblem)
    } else {
        // TODO: Fetch the generated deck and send it to MotherOfDragons. For now, use saved deck
        this.props.onSubmitGameConfig(this.state.chosenDeck, this.state.gameLengthProblems, this.state.timePerProblem)
    }
}

render() {
    return (
        <div>
            <h1>Game configuration</h1>
            <form onSubmit={this.submitGameConfig} >
                <input type="radio" name="deckType" value="savedDeck" checked={this.state.deckType === 'savedDeck'} onChange={this.handleChange} />Choose a saved deck of flashcards<br />
                <input type="radio" name="deckType" value="generateDeck" checked={this.state.deckType === 'generateDeck'} onChange={this.handleChange} />Generate a deck
                <SavedDeck handleChange={this.handleChange} decks={this.state.decks} deckType={this.state.deckType} chosenDeck={this.state.chosenDeck}/>
                <GenerateDeckOptions handleChangeGenerateDeck={this.handleChangeGenerateDeck} deckType={this.state.deckType} generateDeck={this.state.generateDeck}/>
                <h4>Number of problems</h4>
                <input type="text" name="gameLengthProblems" value={this.state.gameLengthProblems} onChange={this.handleChange} /> game length <br/>
                {
                    this.state.showTooBigInput ?
                        <p>{this.state.gameLengthProblems} problems exceeds the number of cards in the deck which is {this.state.chosenDeck.flashcards.length}</p>
                        : null
                }
                <h4>Timelimit on each problem in seconds</h4>
                <input type="text" name="timePerProblem" value={this.state.timePerProblem} onChange={this.handleChange} /> time per problem <br />
                <input type="submit" value="Start Game"/>
            </form>
        </div>
    )
}
}


export class SavedDeck extends Component {
    render() {
        return this.props.deckType === 'savedDeck' && this.props.chosenDeck !== 'placeholder' ? (
                <div>
                    <select value={this.props.chosenDeck.id} onChange={this.props.handleChange}>
                        {
                            this.props.decks.map((deck, index) => (
                                    <option key={index} value={deck.id}>{deck.name}</option>
                                )
                            )
                        }
                    </select>
                    <p data-type="description">{this.props.chosenDeck.description}</p>
                    <h4>Sample problem from deck</h4>
                    <p>Problem: {this.props.chosenDeck.flashcards[0].problem}</p>
                    <p>Solution: {this.props.chosenDeck.flashcards[0].solution}</p>
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