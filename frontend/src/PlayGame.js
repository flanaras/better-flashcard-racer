import React, {Component} from 'react'

export default class PlayGame extends Component {
    render() {
        return (
            <div>
                <h1>Play Game!</h1>
                <ul>
                    {
                        this.props.chosenDeck.flashcards.map((flashcard, index) => (
                                    <li key={index} value={flashcard.id}>{flashcard.problem}</li>
                                )
                            )
                        }
                </ul>
            </div>
        )
    }
}


