import React, {Component} from 'react'
import {browserHistory} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
    }


    onSubmitGameConfig(chosenDeck, gameType, gameLength) {
        this.setState({chosenDeck, gameType, gameLength})
        browserHistory.push('playgame')
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {
                    chosenDeck: this.state.chosenDeck,
                    onSubmitGameConfig: this.onSubmitGameConfig
                })}
            </div>
            )
    }
}
