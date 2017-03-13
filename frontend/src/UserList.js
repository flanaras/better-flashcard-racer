/**
 * Created by Fabian Schöndorff on 13.02.17.
 */
import React, {Component} from 'react'
import { PageHeader, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import config from '../config.json';
import {Link} from "react-router";
import LoadJson from './services/LoadJson';
import UserSettings from './UserSettings';

export default class UserList extends Component {

  constructor() {
    super();

    this.state = { users : [] };

    this.apiCall = this.apiCall.bind(this);
    this.apiDeleteCall = this.apiDeleteCall.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    this.props.loadUserInfo();
    this.apiCall('users');
  }

  async apiCall(endpoint) {
    const url = `${config.mock_api_url}/${endpoint}`;
    const users = await LoadJson(url);
    this.setState({users});
  }

  async apiDeleteCall(endpoint, userid, index) {
    const url = `${config.mock_api_url}/${endpoint}/${userid}`;
    const delUserAck = await LoadJson(url, 'DELETE');
    if (delUserAck === 'ok') {
        this.setState({newUserMsg: 'User deleted successfully!'});
        this.apiCall('users');
    } else {
        this.setState({newUserMsg: 'User could not be deleted. Try again!'});
        alert(this.state.newUserMsg);
    }
  }

  handleDeleteUser(e) {
    const userid = e.target.value;
    const index = this.state.users.findIndex(user => user.id==userid);
    this.apiDeleteCall('users', userid, index);
  }

  handleEditUser(e) {
    const userid = e.target.value;
    const index = this.state.users.findIndex(user => user.id==userid);
    const user = this.state.users[index];
    this.props.editUser(user.id, user.username, user.auth_id);
  }

  render() {
    const userList = this.state.users.map((user, index) =>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.auth_level}</td>
        <td>
            <Button bsStyle="link" name={"editButton"+index} value={user.id} onClick={this.handleEditUser}>Edit</Button>
            {' '}
            <Button bsStyle="link" name={"deleteButton"+index} value={user.id} onClick={this.handleDeleteUser}>Delete</Button>
        </td>
      </tr>
    );
    if(this.props.children) {
          return (React.cloneElement(this.props.children, {
              loadUserInfo: this.props.loadUserInfo,
              auth: this.props.auth,
              userid: this.props.userid,
              username: this.props.username,
              userRoleId: this.props.userRoleId,
              logout: this.props.logout,
              editUser: this.props.editUser,
              newUserId: this.props.newUserId,
              newUser: this.props.newUser,
              newUserRoleId: this.props.newUserRoleId,
              routes: this.props.routes
          }));
    } else {
        return (
            this.props.auth ?
                <div>
                    <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                        Flashcard Racer
                        <small>{this.props.route.name}</small>
                    </PageHeader>
                    <UserSettings auth={this.props.auth} routes={this.props.routes} userid={this.props.userid}
                                  username={this.props.username} logout={this.props.logout}/>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={1} md={3}></Col>
                            <Col xs={12} md={6}>
                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Options</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userList}
                                    <tr><Link to="/dashboard/users/createuser">Add</Link></tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={1} md={3}></Col>
                        </Row>
                    </Grid>
                </div>
                : <div/>
        )
    }
  }
}

