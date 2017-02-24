import React, {Component} from 'react'
import {Link} from "react-router";
import config from "./../config.json";
import LoadJson from "./services/LoadJson";

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '',
            password: '',
            userid: NaN,
            userRole: '',
            userRoleId: NaN,
            auth: false,
            loginErrorMsg: ''
        }

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, username, password) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const loginAck = await LoadJson(url, 'POST', {username, password});
        if (typeof(loginAck.error) !== 'undefined' && loginAck.error === 'accessDenied') {
            this.setState({loginErrorMsg: 'Wrong username and/or password. Try again!'});
        } else if (typeof(loginAck.id) !== 'undefined') {
            this.setState({userid: loginAck.id,
                        username: loginAck.username,
                        userRole: loginAck.auth_level,
                        userRoleId: loginAck.auth_id,
                        auth: true});
            this.props.login(this.state.username, this.state.userRole, this.state.userRoleId, this.state.auth);
        }
    }

    onLoginChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, loginErrorMsg: ''});
    }

    onSubmitLogin(e) {
        e.preventDefault();
        this.apiCall('login', this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the (better) flashcard racer!</h1>
                <form onSubmit={this.onSubmitLogin}>
                    <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onLoginChange} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onLoginChange} />
                    <p>{this.state.loginErrorMsg}</p>
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="deckconfig" >Try practice mode</Link>
            </div>
        )
    }
}
