import React, {Component} from 'react'
import {browserHistory} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
        this.submitCreateRoom = this.submitCreateRoom.bind(this)
    }


    onSubmitGameConfig(chosenDeck, gameLengthProblems, timePerProblem) {
        this.setState({chosenDeck, gameLengthProblems, timePerProblem})
        browserHistory.push('playgame')
    }

    submitCreateRoom() {

        browserHistory.push('/');
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
                    timePerProblem: this.state.timePerProblem,
                    submitCreateRoom: this.state.submitCreateRoom
                })}
            </div>
            )
    }
}


