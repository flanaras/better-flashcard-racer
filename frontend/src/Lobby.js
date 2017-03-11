import React from 'react';
import config from './../config.json'
import { PageHeader, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {Link} from "react-router";
import CreateRoom from './CreateRoom';

import sampleData from '../../sockets/docs/Lobby.json';
const sampleUser = {id : 1, username : 'Astrid'};
const eventHost = {"id": 2, "auth_level": "teacher", "username": "Teachername"};
var socket;

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      roomList : sampleData.rooms,
      displayList : true
    };

    this.displayList = this.displayList.bind(this);
  }

  componentWillMount() {
    socket = io(config.socket.url + '/' + config.socket.lobbyNamespace);
    var self = this;
    socket.on('connect', function() {

      socket.emit(config.socket.joinLobby, eventHost);
    });

    socket.on(config.socket.lobbyState, (data) => {
      //todo: the server response should contain data as described in '../../sockets/docs/Lobby.json'
      //todo: as soon as that is in place, update the roomList with this data
      console.log('The lobby state was sent!');
      console.log('Lobby state: ', data);
    });

    socket.on(config.socket.roomState, (data) => {
      console.log('The room state was sent!');
      console.log('Room state: ', JSON.parse(data));
      this.setState({roomList : JSON.parse(data)});
    });
  }

  joinRoom() {
    console.log(this);
    //socket.emit(config.socket.joinRoom, { id : this });
  }

  createRoom(roomPayload) {
    console.log(roomPayload);
    socket.emit(config.socket.createRoom, roomPayload);
  }

  displayList() {
    this.setState({displayList : !this.state.displayList})
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
        {this.state.displayList ?
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
            <Row>
              <Col xs={1} md={3}></Col>
              <Col xs={12} md={6}>
                <Button bsStyle="info" onClick={this.displayList}>
                  Create new room
                </Button>
              </Col>
              <Col xs={1} md={3}></Col>
            </Row>
          </Grid>
          :
          <Grid>
            <CreateRoom createRoom={this.createRoom}/>
            <Row>
              <Col xs={1} md={3}></Col>
              <Col xs={12} md={6}>
                <Button bsStyle="info" onClick={this.displayList}>
                  Back to Lobby
                </Button>
              </Col>
              <Col xs={1} md={3}></Col>
            </Row>
          </Grid>
        }
      </div>
    )
  }
}