import React, {Component} from 'react';
import {browserHistory} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
        this.onDeckChange = this.onDeckChange.bind(this)
        this.login = this.login.bind(this)
        this.editUser = this.editUser.bind(this)
    }


    onSubmitGameConfig(chosenDeck, gameLengthProblems, timePerProblem) {
        this.setState({chosenDeck, gameLengthProblems, timePerProblem})
        browserHistory.push('playgame')
    }

    submitAnswers(chosenDeck) {
        this.setState({chosenDeck});
        browserHistory.push('solutions');
    }

    login(username, userRole, userRoleId, auth) {
        this.setState({username, userRole, userRoleId, auth});
        browserHistory.push('dashboard');
    }

    editUser(newUserId, newUser, newUserRoleId) {
        this.setState({newUserId, newUser, newUserRoleId});
        browserHistory.push('edituser');
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
                    decks: this.state.decks,
                    onDeckChange: this.onDeckChange,
                    chosenDeck: this.state.chosenDeck,
                    login: this.login,
                    username: this.state.username,
                    userRole: this.state.userRole,
                    userRoleId: this.state.userRoleId,
                    auth: this.state.auth,
                    editUser: this.editUser,
                    newUserId: this.state.newUserId,
                    newUser: this.state.newUser,
                    newUserRoleId: this.state.newUserRoleId
                })}
            </div>
        )
    }
}
