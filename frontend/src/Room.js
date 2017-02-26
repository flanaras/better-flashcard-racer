import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import config from './../config.json'
import {Link} from "react-router";
import LoadJson from "./services/LoadJson"
import { PageHeader, Grid, Row, Col, Table } from 'react-bootstrap';
import io from 'socket.io-client';

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      userList : []
    };

    this.initList = this.initList.bind(this);
    this.removeUserFromList = this.removeUserFromList.bind(this);
    this.addUserToList = this.addUserToList.bind(this);
  }

  componentWillMount() {
    const socket = io(config.socket.url);
    var self = this;
    socket.on('connect', function() {

    });

    socket.on(config.socket.getUserList, function (data) {
      self.initList(data.users);
    });

    socket.on(config.socket.newStudent, function (data) {
      self.addUserToList(data.user);
    });

    socket.on(config.socket.studentLeft, function (data) {
      self.removeUserFromList(data.user);
    });
  }

  initList(userList) {
    this.setState({userList : userList});
  }

  removeUserFromList(student) {
    var index = this.state.userList.indexOf(student);
    this.state.userList.splice(index, 1);

    this.setState({userList : this.state.userList})
  }

  addUserToList(student) {
    this.setState({userList : this.state.userList.concat([student])});
  }

  render() {
    const userList = this.state.userList.map((user) =>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
      </tr>
    );

    return (
      <div>
        <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Room</small></PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              You are currently in the lobby with these users:
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {userList}
                </tbody>
              </Table>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
        </Grid>
      </div>
    )
  }
}