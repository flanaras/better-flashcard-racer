import React, {Component} from 'react';
import update from 'react-addons-update';
import config from './../config.json';
import LoadJson from "./services/LoadJson";
import {browserHistory} from "react-router";
import UserSettings from './UserSettings';
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authLevel: [],
            newUserInfo: {
                newUserId: NaN,
                newUser: '',
                newUserRoleId: NaN,
                newUserMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.apiGetAuthLevelsCall = this.apiGetAuthLevelsCall.bind(this);
        this.apiEditUserCall = this.apiEditUserCall.bind(this);
    }

    componentWillMount() {
        this.setState({newUserInfo: this.props.newUserInfo});
        this.apiGetAuthLevelsCall('authlevel/'+this.props.userInfo.userRoleId);
    }

    async apiGetAuthLevelsCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`;
        const authLevel = await LoadJson(url);
        this.setState({authLevel});
    }

    async apiEditUserCall(endpoint) {
        const url = `${config.base_url}/${endpoint}`;
        const newUserAck = await LoadJson(url, 'PUT', {username: this.state.newUserInfo.newUser, auth_level: this.state.newUserInfo.newUserRoleId});
        if (typeof(newUserAck.ok) !== 'undefined' && newUserAck.ok === 'userEdited') {
            var newUserInfoParam = update(this.state, {
                newUserInfo: {
                    newUserMsg: { $set: 'User updated successfully!' }
                }
            });
            this.setState(newUserInfoParam);
            this.props.addEditUser(this.state.newUserInfo);
            browserHistory.push('/dashboard/users');
        } else {
            var newUserInfoParam = update(this.state, {
                newUserInfo: {
                    newUserMsg: { $set: 'User could not be updated. Try again!' }
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
                newUserMsg: { $set: '' }
            }
        });
        this.setState(newUserInfoParam);
    }

    onEditUser(e) {
        e.preventDefault();
        this.apiEditUserCall('users/'+this.state.newUserInfo.newUserId);
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
            this.props.userInfo.auth?
                <div>
                    <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                        Flashcard Racer
                        <small>{this.props.route.name}</small>
                    </PageHeader>
                    <UserSettings routes={this.props.routes} userInfo={this.props.userInfo} logout={this.props.logout}/>
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
                                        <p>{this.state.newUserInfo.newUserMsg}</p>
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
