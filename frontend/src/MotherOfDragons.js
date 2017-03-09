import React, {Component} from 'react';
import {browserHistory} from "react-router";
import cookie from "react-cookie";

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onSubmitGameConfig = this.onSubmitGameConfig.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
        this.login = this.login.bind(this)
        this.editUser = this.editUser.bind(this)
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

    submitAnswers(chosenDeck) {
        this.setState({chosenDeck});
        browserHistory.push('solutions');
    }

    login(userid, username, userRole, userRoleId, auth) {

        let d = new Date();
        d.setTime(d.getTime() + (30*60*1000));

        cookie.save("userid", userid, {path: "/", expires: d});
        cookie.save("username", username, {path: "/", expires: d});
        cookie.save("userRole", userRole, {path: "/", expires: d});
        cookie.save("userRoleId", userRoleId, {path: "/", expires: d});
        cookie.save("auth", auth, {path: "/", expires: d});

        browserHistory.push('dashboard');
    }

    loadUserInfo() {
        this.setState({
                auth: cookie.load("auth") === "true" ? true : false,
                userid: cookie.load("userid"),
                username: cookie.load("username"),
                userRole: cookie.load("userRole"),
                userRoleId: cookie.load("userRoleId")
            });
    }

    logout() {
        cookie.remove("auth");
        cookie.remove("userid");
        cookie.remove("username");
        cookie.remove("userRole");
        cookie.remove("userRoleId");

        this.setState({
            userid: NaN,
            username: '',
            userRole: '',
            userRoleId: NaN,
            auth: false});

        browserHistory.push('/');
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
                    login: this.login,
                    loadUserInfo: this.loadUserInfo,
                    auth: this.state.auth,
                    userid: this.state.userid,
                    username: this.state.username,
                    userRole: this.state.userRole,
                    userRoleId: this.state.userRoleId,
                    logout: this.logout,
                    editUser: this.editUser,
                    newUserId: this.state.newUserId,
                    newUser: this.state.newUser,
                    newUserRoleId: this.state.newUserRoleId
                })}
            </div>
        )
    }
}
