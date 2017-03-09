import React from 'react';
import config from './../config.json'
import { PageHeader, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {Link} from "react-router";

import sampleData from '../../sockets/docs/Lobby.json';
const sampleUser = {id : 1, username : 'Astrid'};

var socket;

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      roomList: sampleData.rooms
    };

  }

  componentWillMount() {
    socket = io(config.socket.url + '/' + config.socket.lobbyNamespace);
    var self = this;
    socket.on('connect', function() {

      socket.emit(config.socket.joinLobby, sampleUser);
    });

    socket.on(config.socket.lobbyState, (data) => {
      //todo: the server response should contain data as described in '../../sockets/docs/Lobby.json'
      //todo: as soon as that is in place, update the roomList with this data
      console.log(data);
    })
  }

  joinRoom() {
    socket.emit(config.socket.joinRoom, { id : this });
  }

  render() {
    const roomList = this.state.roomList.map((room) =>
      <tr key={room.id}>
        <td>{room.name}</td>
        <td>{room.host.username}</td>
        <td>{room.deck.name}</td>
        <td>
          <Link to="" onClick={this.joinRoom.bind(room.id)}>
            <Button bsStyle="info" >
              Join
            </Button>
          </Link>
        </td>
      </tr>
    );

    return (
      <div>
        <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Lobby</small></PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              The following rooms are currently available:
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Room</th>
                  <th>Host</th>
                  <th>Deck</th>
                  <th>Join</th>
                </tr>
                </thead>
                <tbody>
                {roomList}
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