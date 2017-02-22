import React, { Component } from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";
import { PageHeader, Form, Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';

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
                    minus: true,
                    multi: false,
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
        this.savedDeckDropdownChange = this.savedDeckDropdownChange.bind(this)
        this.gameLengthChange = this.gameLengthChange.bind(this)
        this.deckTypeChange = this.deckTypeChange.bind(this)
    }

    componentDidMount() {
        this.apiCall('decks')
    }

    async apiCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`
        let decks = await LoadJson(url)
        const renamedDecks = decks.map(deck => this.renameAttributes(deck))
        this.setState({decks: renamedDecks})
        this.setState({chosenDeck: renamedDecks[0]})
    }

    renameAttributes(deck) {
        const tempRename = deck.flashcard
        let flashcards = tempRename.map( row => {
            return {problem: row.problem, solution: parseInt(row.answer), id: row.id}
        })

        delete deck.flashcard
        deck.flashcards = flashcards
        return deck
    }

    deckTypeChange(e) {
        let value = e.target.value
        const name = e.target.name
        if(this.state.deckType === 'generateDeck') {
            let gameLengthProblems, showTooBigInput
            ({gameLengthProblems, showTooBigInput} = this.validateGameLength(this.state.chosenDeck.flashcards.length, this.state.chosenDeck, 'gameLengthProblems'))
            this.setState({[name]: value, gameLengthProblems, showTooBigInput})
        } else {
            this.setState({[name]: value, showTooBigInput: false})
        }
    }

    gameLengthChange(e) {
        let value = e.target.value
        const name = e.target.name
        if(this.state.deckType === 'savedDeck') {
            let gameLengthProblems, showTooBigInput
            ({gameLengthProblems, showTooBigInput} = this.validateGameLength(value, this.state.chosenDeck, name))
            this.setState({gameLengthProblems, showTooBigInput})
        } else {
            this.setState({[name]: value, showTooBigInput: false})
        }
    }

    savedDeckDropdownChange(e) {
        let value = e.target.value
        const chosenDeck = this.state.decks.find( deck => parseInt(deck.id) === parseInt(value))
        this.setState({chosenDeck})
    }

    handleChange(e) {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        this.setState({[name]: value, showTooBigInput: false})
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

    async submitGameConfig(e) {
        e.preventDefault()
        const deckType = this.state.deckType
        if(deckType === 'savedDeck') {
            const trimmedDeck = this.trimDeckToGameLength(this.state.chosenDeck, this.state.gameLengthProblems);
            this.props.onSubmitGameConfig(trimmedDeck, this.state.gameLengthProblems, this.state.timePerProblem)
        } else {
            const reqPayload = {
                min: this.state.generateDeck.operandRange.min,
                max: this.state.generateDeck.operandRange.max,
                numberSolution: this.state.gameLengthProblems,
                operators: [{
                    minus: this.state.generateDeck.operators.minus,
                    add: this.state.generateDeck.operators.add,
                    div: this.state.generateDeck.operators.div,
                    multi: this.state.generateDeck.operators.multi
                }]
            }
            const chosenDeck = await LoadJson(config.base_url + '/generate-cards', 'POST', reqPayload)
            this.props.onSubmitGameConfig(chosenDeck, this.state.gameLengthProblems, this.state.timePerProblem)
        }
    }

    trimDeckToGameLength(chosenDeck, gameLengthProblems) {
        chosenDeck.flashcards.length = gameLengthProblems
        return chosenDeck
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Game Configuration</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={3}></Col>
                        <Col xs={12} md={6}>
                            <Panel style={{textAlign: "center"}}>
                                <Form onSubmit={this.submitGameConfig} >
                                    <Panel style={{textAlign: "left"}}>
                                        <ControlLabel>Options:</ControlLabel>
                                        <Radio name="deckType" value="savedDeck" checked={this.state.deckType === 'savedDeck'} onChange={this.deckTypeChange} >
                                            Choose a saved deck of flashcards
                                        </Radio>
                                        <Radio name="deckType" value="generateDeck" checked={this.state.deckType === 'generateDeck'} onChange={this.deckTypeChange} >
                                            Generate a deck
                                        </Radio>
                                    </Panel>

                                    <SavedDeck handleChange={this.savedDeckDropdownChange} decks={this.state.decks} deckType={this.state.deckType} chosenDeck={this.state.chosenDeck}/>
                                    <GenerateDeckOptions handleChangeGenerateDeck={this.handleChangeGenerateDeck} deckType={this.state.deckType} generateDeck={this.state.generateDeck}/>
                                    <Panel style={{textAlign: "left"}}>
                                        <ControlLabel>Game length:</ControlLabel>
                                    <FormGroup controlId="gameLength">
                                        <ControlLabel>Number of problems:</ControlLabel>
                                        {' '}
                                        <FormControl type="text" style={{textAlign: "right", width: 80, display: 'inline'}} name="gameLengthProblems" value={this.state.gameLengthProblems} onChange={this.gameLengthChange} />
                                        {
                                            this.state.showTooBigInput ?
                                                <p>{this.state.gameLengthProblems} problems exceeds the number of cards in the deck which is {this.state.chosenDeck.flashcards.length}</p>
                                                : null
                                        }
                                        {' '}
                                        <ControlLabel>Time per question (s):</ControlLabel>
                                        {' '}
                                        <FormControl type="text" style={{textAlign: "right", width: 80, display: 'inline'}} name="timePerProblem" value={this.state.timePerProblem} onChange={this.gameLengthChange} />
                                    </FormGroup>
                                </Panel>
                                <Button bsStyle="info" type="submit">
                                    Start game
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
            </Grid>
        </div>
    )
}
}


export class SavedDeck extends Component {
    render() {
        return this.props.deckType === 'savedDeck' && this.props.chosenDeck !== 'placeholder' ? (
                <div>
                    <Panel style={{textAlign: "left"}}>
                        <FormGroup controlId="deckSelect">
                            <ControlLabel>Details:</ControlLabel>
                            {' '}
                            <FormControl componentClass="select" value={this.props.chosenDeck.id} onChange={this.props.handleChange} >
                                {
                                    this.props.decks.map((deck, index) => (
                                            <option key={index} value={deck.id}>{deck.name}</option>
                                        )
                                    )
                                }
                            </FormControl>
                            <p data-type="description"><i>{this.props.chosenDeck.description}</i></p>
                            <ControlLabel>Sample problem:</ControlLabel>
                            <p>Problem: {this.props.chosenDeck.flashcards[0].problem}</p>
                            <p>Solution: {this.props.chosenDeck.flashcards[0].answer}</p>
                        </FormGroup>
                    </Panel>
                </div>
            ) : null
    }
}


export class GenerateDeckOptions extends Component {
    render() {
        return  this.props.deckType === 'generateDeck' ? (
                <div>
                    <Panel style={{textAlign: "left"}}>
                        <FormGroup controlId="detOpt" >
                            <ControlLabel>Details:</ControlLabel>
                            {' '}
                            <Checkbox inline name="add" checked={this.props.generateDeck.operators.add} onChange={this.props.handleChangeGenerateDeck} >
                                Addition
                            </Checkbox>
                            <Checkbox inline name="minus" checked={this.props.generateDeck.operators.minus} onChange={this.props.handleChangeGenerateDeck} >
                                Subtraction
                            </Checkbox>
                            <Checkbox inline name="multi" checked={this.props.generateDeck.operators.multi} onChange={this.props.handleChangeGenerateDeck} >
                                Multiplication
                            </Checkbox>
                            <Checkbox inline name="div" checked={this.props.generateDeck.operators.div} onChange={this.props.handleChangeGenerateDeck} >
                                Division
                            </Checkbox>
                        </FormGroup>
                    </Panel>
                    <Panel style={{textAlign: "left"}}>
                        <ControlLabel >Number range:</ControlLabel>
                        <FormGroup controlId="numRange">
                            {' '}
                            <ControlLabel>Min:</ControlLabel>
                            {' '}
                            <FormControl type="text" style={{textAlign: "right", width: 80, display: 'inline'}} name="min" value={this.props.generateDeck.operandRange.min} onChange={this.props.handleChangeGenerateDeck} />
                            {' '}
                            <ControlLabel>Max: </ControlLabel>
                            {' '}
                            <FormControl type="text" style={{textAlign: "right", width: 80, display: 'inline'}} name="max" value={this.props.generateDeck.operandRange.max} onChange={this.props.handleChangeGenerateDeck} />
                        </FormGroup>
                    </Panel>
                </div>
            ) : null
    }
}

