import React, {Component} from 'react';
import {browserHistory} from "react-router";
import cookie from "react-cookie";

export default class MotherOfDragons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                auth: false,
                userid: NaN,
                username: '',
                userRole: '',
                userRoleId: NaN
            }
        }
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
        this.submitCreateRoom = this.submitCreateRoom.bind(this)
        this.login = this.login.bind(this)
        this.loadUserInfo = this.loadUserInfo.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidUpdate() {
        localStorage.setItem('ticker', JSON.stringify(this.state));
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

    login(userInfo) {
        cookie.save("userid", userInfo.userid, {path: "/"});
        cookie.save("username", userInfo.username, {path: "/"});
        cookie.save("userRole", userInfo.userRole, {path: "/"});
        cookie.save("userRoleId", userInfo.userRoleId, {path: "/"});
        cookie.save("auth", userInfo.auth, {path: "/"});

        this.setState({userInfo});

        browserHistory.push('/dashboard');
    }

    loadUserInfo() {
        this.setState({
            userInfo: {
                auth: cookie.load("auth") === "true" ? true : false,
                userid: cookie.load("userid"),
                username: cookie.load("username"),
                userRole: cookie.load("userRole"),
                userRoleId: cookie.load("userRoleId")
            }
        });
    }

    logout() {
        cookie.remove("auth");
        cookie.remove("userid");
        cookie.remove("username");
        cookie.remove("userRole");
        cookie.remove("userRoleId");

        this.setState({
            userInfo: {
                userid: NaN,
                username: '',
                userRole: '',
                userRoleId: NaN,
                auth: false
            }
        });

        browserHistory.push('/');
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
                    login: this.login,
                    loadUserInfo: this.loadUserInfo,
                    userInfo: this.state.userInfo,
                    logout: this.logout,
                    routes: this.props.routes,
                    submitCreateRoom: this.state.submitCreateRoom
                })}
            </div>
        )
    }
}
