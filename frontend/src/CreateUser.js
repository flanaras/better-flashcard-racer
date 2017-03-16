import React, {Component} from 'react';
import update from 'react-addons-update';
import config from './../config.json';
import LoadJson from "./services/LoadJson";
import UserSettings from './UserSettings';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authLevel: [],
            newUserInfo: {
                newUser: '',
                newPassw: '',
                reNewPassw: '',
                newUserRoleId: NaN,
                newUserMsg: '',
                newPassError: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.apiGetCall = this.apiGetCall.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    componentWillMount() {
        this.apiGetCall('authlevel/'+this.props.userRoleId);
    }

    async apiGetCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`;
        const authLevel = await LoadJson(url);
        this.setState({authLevel});
    }

    async apiCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`;
        const newUserAck = await LoadJson(url, 'POST', {username: this.state.newUserInfo.newUser, password: this.state.newUserInfo.newPassw, auth_level: this.state.newUserInfo.newUserRoleId});
        if (typeof(newUserAck.ok) !== 'undefined' && newUserAck.ok === 'userCreated') {
            var newUserInfoParam = update(this.state, {
                newUserInfo: {
                    newUserMsg: { $set: 'New user created successfully!' }
                }
            });
            this.setState(newUserInfoParam);
            this.props.addEditUser({newUserId: NaN, newUser: this.state.newUserInfo.newUser, newUserRoleId: this.state.newUserInfo.newUserRoleId, newUserMsg: this.state.newUserInfo.newUserMsg});
        } else {
            var newUserInfoParam = update(this.state, {
                newUserInfo: {
                    newUserMsg: { $set: 'New user could not be created. Try again!' }
                }
            });
            this.setState(newUserInfoParam);
        }
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        var newUserInfoParam = update(this.state, {
            newUserInfo: {
                [name]: { $set: value },
                newUserMsg: { $set: '' },
                newPassError: { $set: '' }
            }
        });
        this.setState(newUserInfoParam);
    }

    onCreateUser(e) {
        e.preventDefault();
        if(this.state.newUserInfo.newPassw!==this.state.newUserInfo.reNewPassw) {
            var newUserInfoParam = update(this.state, {
                newUserInfo: {
                    newPassError: {$set: 'Passwords does not match!'}
                }
            });
            this.setState(newUserInfoParam);
        } else
            this.apiCall('users');
    }

    render() {
        return (
            this.props.auth?
                <div>
                    <PageHeader  style={{textAlign: "center", marginBottom: 0}}>
                        Flashcard Racer <small>{this.props.route.name}</small>
                    </PageHeader>
                    <UserSettings auth={this.props.auth} routes={this.props.routes} userid={this.props.userid} username={this.props.username} logout={this.props.logout}/>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={1} md={4}></Col>
                            <Col xs={4} md={4}>
                                <Panel style={{textAlign: "center"}}>
                                    <form onSubmit={this.onCreateUser}>
                                        <FormGroup controlId="username">
                                            <ControlLabel>Username:</ControlLabel>
                                            {' '}
                                            <FormControl type="text" style={{textAlign: "center"}} name="newUser" placeholder="Username" value={this.state.newUserInfo.newUser} onChange={this.handleChange} />
                                        </FormGroup>
                                        {' '}
                                        <FormGroup controlId="password">
                                            <ControlLabel>Password:</ControlLabel>
                                            {' '}
                                            <FormControl type="password" style={{textAlign: "center"}} ref="newUser" name="newPassw" placeholder="Password" value={this.state.newUserInfo.newPassw} onChange={this.handleChange} />
                                        </FormGroup>
                                        {' '}
                                        <FormGroup controlId="rePassword">
                                            <ControlLabel>Repeat password:</ControlLabel>
                                            {' '}
                                            <FormControl type="password" style={{textAlign: "center"}} name="reNewPassw" placeholder="Repeat Password" value={this.state.newUserInfo.reNewPassw} onChange={this.handleChange} />
                                        </FormGroup>
                                        {' '}
                                        <FormGroup controlId="username">
                                            <ControlLabel>Role:</ControlLabel>
                                            {' '}
                                            <FormControl componentClass="select" name="newUserRoleId" onChange={event => this.handleChange(event)}>
                                                {
                                                    this.state.authLevel.map((authLevel, index) => (
                                                            <option key={index} value={authLevel.id}>{authLevel.auth}</option>
                                                        )
                                                    )
                                                }
                                            </FormControl>
                                        </FormGroup>
                                        {' '}
                                        <Button bsStyle="info" type="submit">
                                            Create user
                                        </Button>
                                        <p>{this.state.newUserInfo.newUserMsg}</p>
                                        <p>{this.state.newUserInfo.newPassError}</p>
                                    </form>
                                </Panel>
                            </Col>
                            <Col xs={1} md={4}></Col>
                        </Row>
                    </Grid>
                </div>
                :<div/>
        )
    }
}
