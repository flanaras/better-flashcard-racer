import React, {Component} from 'react'
import update from 'react-addons-update';
import config from './../config.json'
import LoadJson from "./services/LoadJson";
import {browserHistory} from "react-router";
import UserSettings from './UserSettings';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authLevel: [],
            newUserInfo: this.props.newUserInfo,
            newUserMsg: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
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
        const url = `${config.base_url}/${endpoint}/${this.state.newUserInfo.newUserId}`;
        const newUserAck = await LoadJson(url, 'PUT', {username: this.state.newUserInfo.newUser, auth_level: this.state.newUserInfo.newUserRoleId});
        if (typeof(newUserAck.ok) !== 'undefined' && newUserAck.ok === 'userEdited') {
            this.setState({newUserMsg: 'User updated successfully!'});
            this.props.editUser(this.state.newUserInfo);
            browserHistory.push('/dashboard/users');
        } else {
            this.setState({newUserMsg: 'User could not be updated. Try again!'});
        }
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        var newUserInfoParam = update(this.state, {
            newUserInfo: {
                [name]: { $set: value }
            }
        });
        this.setState(newUserInfoParam);
        this.setState({newUserMsg: ''});
    }

    onEditUser(e) {
        e.preventDefault();
        this.apiCall('users');
    }

    render() {
        var authLevels = <FormControl componentClass="select" name="newUserRoleId" onChange={event => this.handleChange(event)} >
                            { this.state.authLevel.map((authLevel, index) => {
                                if (authLevel.id === this.state.newUserInfo.newUserRoleId)
                                    return <option selected='selected' key={index}
                                                   value={authLevel.id}>{authLevel.auth}</option>
                                else
                                    return <option key={index} value={authLevel.id}>{authLevel.auth}</option>
                            })}
                        </FormControl>
        return (
            this.props.auth?
                <div>
                    <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                        Flashcard Racer
                        <small>{this.props.route.name}</small>
                    </PageHeader>
                    <UserSettings auth={this.props.auth} routes={this.props.routes} userid={this.props.userid}
                                  username={this.props.username} logout={this.props.logout}/>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={1} md={4}></Col>
                            <Col xs={4} md={4}>
                                <Panel style={{textAlign: "center"}}>
                                    <form onSubmit={this.onEditUser}>
                                        <FormGroup controlId="username">
                                            <ControlLabel>Username:</ControlLabel>
                                            {' '}
                                            <FormControl type="text" style={{textAlign: "center"}} name="newUser" value={this.state.newUserInfo.newUser} onChange={this.handleChange} />
                                        </FormGroup>
                                        {' '}
                                        <FormGroup controlId="username">
                                            <ControlLabel>Role:</ControlLabel>
                                            {' '}
                                            {authLevels}
                                        </FormGroup>
                                        {' '}
                                        <Button bsStyle="info" type="submit">
                                            Update user
                                        </Button>
                                        <p>{this.state.newUserMsg}</p>
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
