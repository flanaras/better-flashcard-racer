import React, {Component} from 'react'
import {Link} from "react-router";
import config from './../config.json';
import LoadJson from "./services/LoadJson";

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
        this.state = {nickname: '',
            password: '',
            username: '',
            userRole: '',
            auth: false
        }

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, nickname, password) {
        const url = `${config.mock_api_url}/${endpoint}`;
        const userInfo = await LoadJson(url, 'POST', {nickname, password});
        // TODO: Address login errors
        this.setState({username: userInfo[0].username, userRole: userInfo[0].auth_level});
        this.props.login(this.state.username, true);
    }

    onLoginChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    }

    onSubmitLogin(e) {
        // TODO: Add login post
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
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="deckconfig" >Try practice mode</Link>
            </div>
        )
    }
}