import React, {Component} from 'react'
import {Link} from "react-router";
import config from './../config.json';
import LoadJson from "./services/LoadJson";

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
        this.state = {nickname: '',
            password: '',
            userid: NaN,
            username: '',
            userRole: '',
            auth: false,
            loginErrorMsg: ''
        }

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, nickname, password) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const loginAck = await LoadJson(url, 'POST', {nickname, password});
        if (typeof(loginAck.error) !== 'undefined' && loginAck.error === 'accessDenied') {
            this.setState({loginErrorMsg: 'Wrong nickname and/or password. Try again!'});
        } else if (typeof(loginAck[0].id) !== 'undefined') {
            this.setState({userid: loginAck[0].id, username: loginAck[0].username, userRole: loginAck[0].auth_level});
            this.props.login(this.state.username, this.state.userRole, true);
        }
    }

    onLoginChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, loginErrorMsg: ''});
    }

    onSubmitLogin(e) {
        e.preventDefault();
        this.apiCall('login', this.state.nickname, this.state.password);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the (better) flashcard racer!</h1>
                <form onSubmit={this.onSubmitLogin}>
                    <input type="text" name="nickname" placeholder="Nickname" value={this.state.nickname} onChange={this.onLoginChange} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onLoginChange} />
                    <p>{this.state.loginErrorMsg}</p>
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="deckconfig" >Try practice mode</Link>
            </div>
        )
    }
}