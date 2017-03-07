import React from 'react';
import config from './../config.json'
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
    const socket = io(config.socket.url + '/' + config.socket.lobbyNamespace);
    var self = this;
    socket.on('connect', function() {
      console.log('Connected to the room namespace');

      socket.emit(config.socket.joinLobby, {id : 1, username : 'Astrid'});
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