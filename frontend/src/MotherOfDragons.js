import React, {Component} from 'react'
import {browserHistory} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
    }


    onSubmitGameConfig(chosenDeck, gameLengthProblems, timePerProblem) {
        const newChosendeck = renameAttributes(chosenDeck)
        this.setState({chosenDeck: newChosendeck, gameLengthProblems, timePerProblem})
        browserHistory.push('playgame')
    }

    submitAnswers(chosenDeck) {
        this.setState({chosenDeck});
        browserHistory.push('solutions');
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {
                    chosenDeck: this.state.chosenDeck,
                    onSubmitGameConfig: this.onSubmitGameConfig,
                    submitAnswers: this.submitAnswers,
                    gameLengthProblems: this.state.gameLengthProblems,
                    timePerProblem: this.state.timePerProblem
                })}
            </div>
            )
    }
}

function renameAttributes(deck) {
    const tempRename = deck.flashcard
    let flashcards = tempRename.map( row => {
        return {problem: row.problem, solution: parseInt(row.answer), id: row.id}
    })

    delete deck.flashcard
    deck.flashcards = flashcards
    return deck
}
