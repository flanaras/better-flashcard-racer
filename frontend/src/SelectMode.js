import React, {Component} from 'react'
import {Link} from "react-router";

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '',
            password: ''
        }

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    onLoginChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    }

    onSubmitLogin(e) {
        // TODO: Add login post
        e.preventDefault();
        this.props.login(this.state.username, this.state.password, true);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the (better) flashcard racer!</h1>
                <form onSubmit={this.onSubmitLogin}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onLoginChange} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onLoginChange} />
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="deckconfig" >Try practice mode</Link>
            </div>
        )
    }
}