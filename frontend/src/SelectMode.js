import React, {Component} from 'react';
import update from 'react-addons-update';
import {Link} from "react-router";
import config from "./../config.json";
import LoadJson from "./services/LoadJson";
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                username: '',
                password: '',
                userid: NaN,
                userRole: '',
                userRoleId: NaN,
                auth: false,
                loginErrorMsg: ''
            }
        }

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`;
        const loginAck = await LoadJson(url, 'POST', {username: this.state.userInfo.username, password: this.state.userInfo.password});
        if (typeof(loginAck.error) !== 'undefined') {
            this.setState({loginErrorMsg: 'Wrong username and/or password. Try again!'});
        } else if (typeof(loginAck.id) !== 'undefined') {
            this.setState({
                userInfo: {
                    userid: loginAck.id,
                    username: loginAck.username,
                    userRole: loginAck.auth_level,
                    userRoleId: loginAck.auth_id,
                    auth: true
                }
            });
            this.props.login(this.state.userInfo);
        }
    }

    onLoginChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        var newUserInfoParam = update(this.state, {
            userInfo: {
                [name]: { $set: value },
                loginErrorMsg: { $set: '' }
            }
        });
        this.setState(newUserInfoParam);
    }

    onSubmitLogin(e) {
        e.preventDefault();
        this.apiCall('login');
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>{this.props.route.name}</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={4}></Col>
                        <Col xs={4} md={4}>
                            <Panel style={{textAlign: "center"}}>
                                <form onSubmit={this.onSubmitLogin}>
                                    <FormGroup controlId="username">
                                        <ControlLabel>Username:</ControlLabel>
                                        {' '}
                                        <FormControl type="text" style={{textAlign: "center"}} id="username" name="username" placeholder="Username" value={this.state.userInfo.username} onChange={this.onLoginChange} />
                                    </FormGroup>
                                    {' '}
                                    <FormGroup controlId="password">
                                        <ControlLabel>Password:</ControlLabel>
                                        {' '}
                                        <FormControl type="password" style={{textAlign: "center"}}  name="password" placeholder="Password" value={this.state.userInfo.password} onChange={this.onLoginChange} />
                                    </FormGroup>
                                    <p>{this.state.loginErrorMsg}</p>
                                    {' '}
                                    <Button bsStyle="info" type="submit">
                                        Sign in
                                    </Button>
                                </form>
                                <Link to="deckconfig" >Try practice mode</Link>
                            </Panel>
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
