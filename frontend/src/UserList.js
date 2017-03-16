/**
 * Created by Fabian Schöndorff on 13.02.17.
 */

import React, {Component} from 'react';
import update from 'react-addons-update';
import { PageHeader, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import config from '../config.json';
import {Link} from "react-router";
import LoadJson from './services/LoadJson';
import UserSettings from './UserSettings';
import {browserHistory} from "react-router";

export default class UserList extends Component {

  constructor() {
    super();

    this.state = {
        users : [],
        newUserInfo: {
            newUserId: NaN,
            newUser: '',
            newUserRoleId: NaN,
            newUserMsg: ''
        }
    };

    this.apiGetUsersCall = this.apiGetUsersCall.bind(this);
    this.apiDeleteUserCall = this.apiDeleteUserCall.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.addEditUser = this.addEditUser.bind(this);
  }

  componentDidMount() {
    this.props.loadUserInfo();
    this.apiGetUsersCall('users');
  }

  async apiGetUsersCall(endpoint) {
    const url = `${config.base_url}/${endpoint}`;
    const users = await LoadJson(url);
    this.setState({users});
  }

  async apiDeleteUserCall(endpoint) {
    const url = `${config.base_url}/${endpoint}`;
    const delUserAck = await LoadJson(url, 'DELETE');
    if (delUserAck === 'ok') {
        var newUserInfoParam = update(this.state, {
            newUserInfo: {
                newUserMsg: { $set: 'User deleted successfully!' }
            }
        });
        this.setState(newUserInfoParam);
        this.apiGetUsersCall('users');
    } else {
        var newUserInfoParam = update(this.state, {
            newUserInfo: {
                newUserMsg: { $set: 'User could not be deleted. Try again!' }
            }
        });
        this.setState(newUserInfoParam);
        alert(this.state.newUserMsg);
    }
  }

  handleDeleteUser(e) {
    const userid = e.target.value;
    this.apiDeleteUserCall('users/'+userid);
  }

  handleEditUser(e) {
      const userid = e.target.value;
      const index = this.state.users.findIndex(user => user.id == userid);
      const user = this.state.users[index];
      this.setState({newUserInfo: {newUserId: user.id, newUser: user.username, newUserRoleId: user.auth_id}});
      browserHistory.push('/dashboard/users/edituser');
  }

  addEditUser(newUserInfo) {
      this.apiGetUsersCall('users');
      this.setState({newUserInfo});
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
              userInfo: this.props.userInfo,
              logout: this.props.logout,
              addEditUser: this.addEditUser,
              newUserInfo: this.state.newUserInfo,
              routes: this.props.routes
          }));
    } else {
        return (
            this.props.userInfo.auth ?
                <div>
                    <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                        Flashcard Racer
                        <small>{this.props.route.name}</small>
                    </PageHeader>
                    <UserSettings routes={this.props.routes} userInfo={this.props.userInfo} logout={this.props.logout}/>
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

