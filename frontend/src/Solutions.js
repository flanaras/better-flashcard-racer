/**
 * Created by alekodu on 2017-02-01.
 */

import React, { Component } from 'react';

export default class Solutions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            countCorrect: 0,
            countIncorrect: 0
        }

        this.props.chosenDeck.map((flashcard) => (
                flashcard.check? this.state.countCorrect++ : this.state.countIncorrect++
            )
        )
    }

    render() {
        return (
            <div>
                <h1>Your results are:</h1>
                <h2>Correct answers: {this.state.countCorrect}</h2>
                <h2>Incorrect answers: {this.state.countIncorrect}</h2>
                <ul>
                    {
                     this.props.chosenDeck.map((flashcard, index) => (
                         <li key={index} style={{color: (flashcard.check? 'green': 'red')}}>Problem: {flashcard.problem}   /   Your answer: {flashcard.answer} /   Correct answer: {flashcard.solution}</li>
                         )
                     )
                     }
                </ul>
            </div>
        );
    }
}

Solutions.PropTypes = {
    countCorrect:       React.PropTypes.number.isRequired,
    countIncorrect:     React.PropTypes.number.isRequired
}