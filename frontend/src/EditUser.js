import React, {Component} from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authLevel: [],
            newUserId: this.props.newUserId,
            newUser: this.props.newUser,
            newRoleId: this.props.newUserRoleId,
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
        const url = `${config.mock_api_url}/${endpoint}`;
        const authLevel = await LoadJson(url);
        this.setState({authLevel});
    }

    async apiCall(endpoint, newUser, newRoleId) {
        const url = `${config.mock_api_url}/${endpoint}/${this.state.newUserId}`;
        const newUserAck = await LoadJson(url, 'PUT', {username: newUser, auth_level: newRoleId});
        if (typeof(newUserAck.ok) !== 'undefined' && newUserAck.ok === 'userEdited') {
            this.setState({newUserMsg: 'User updated successfully!'});
        } else {
            this.setState({newUserMsg: 'User could not be updated. Try again!'});
        }
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value, newUserMsg: ''});
    }

    onEditUser(e) {
        e.preventDefault();
        this.apiCall('users', this.state.newUser, this.state.newRoleId);
    }

    render() {
        var authLevels = <FormControl componentClass="select" name="newRoleId" onChange={event => this.handleChange(event)} >
                            { this.state.authLevel.map((authLevel, index) => {
                                if (authLevel.id === this.props.newUserRoleId)
                                    return <option selected='selected' key={index}
                                                   value={authLevel.id}>{authLevel.auth}</option>
                                else
                                    return <option key={index} value={authLevel.id}>{authLevel.auth}</option>
                            })}
                        </FormControl>
        return (
            this.props.auth?
                <div>
                    <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Edit user</small></PageHeader>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={1} md={4}></Col>
                            <Col xs={4} md={4}>
                                <Panel style={{textAlign: "center"}}>
                                    <form onSubmit={this.onEditUser}>
                                        <FormGroup controlId="username">
                                            <ControlLabel>Username:</ControlLabel>
                                            {' '}
                                            <FormControl type="text" style={{textAlign: "center"}} name="newUser" value={this.state.newUser} onChange={this.handleChange} />
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
