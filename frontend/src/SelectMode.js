import React, {Component} from 'react'
import {Link} from "react-router";
import config from "./../config.json";
import LoadJson from "./services/LoadJson";
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

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
        if (typeof(loginAck.error) !== 'undefined') {
            this.setState({loginErrorMsg: 'Wrong username and/or password. Try again!'});
        } else if (typeof(loginAck.id) !== 'undefined') {
            this.setState({userid: loginAck.id,
                        username: loginAck.username,
                        userRole: loginAck.auth_level,
                        userRoleId: loginAck.auth_id,
                        auth: true});
            this.props.login(this.state.userid, this.state.username, this.state.userRole, this.state.userRoleId, this.state.auth);
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
                                        <FormControl type="text" style={{textAlign: "center"}} id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onLoginChange} />
                                    </FormGroup>
                                    {' '}
                                    <FormGroup controlId="password">
                                        <ControlLabel>Password:</ControlLabel>
                                        {' '}
                                        <FormControl type="password" style={{textAlign: "center"}}  name="password" placeholder="Password" value={this.state.password} onChange={this.onLoginChange} />
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
