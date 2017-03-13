import React from 'react';
import config from './../config.json'
import { PageHeader, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {Link} from "react-router";
import cookie from 'react-cookie';
import CreateRoom from './CreateRoom';

import sampleData from '../../sockets/docs/Lobby.json';
var socket;

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      roomList : sampleData.rooms,
      selectedRoom: '',
      roomDetails : null,
      userList: [],
      displayList : true,
      lobby: true
    };

    this.displayList = this.displayList.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  componentWillMount() {
    if(socket === undefined) {
      socket = io(config.socket.url + '/' + config.socket.lobbyNamespace);
    }

    socket.on('connect', function() {
      const user = { id : cookie.load('userid'), auth_level : cookie.load('userRole'), username : cookie.load('username')};
      socket.emit(config.socket.joinLobby, user);
    });

    socket.on(config.socket.roomState, (data) => {
      let userList;
      let roomDetails;
      const roomList = JSON.parse(data);
      if(this.state.selectedRoom !== '') {
        for(var room in this.state.roomList) {
          if(this.state.roomList[room].id === this.state.selectedRoom) {
            userList = roomList[room].players;
            roomDetails = roomList[room];
          }
        }
      }
      this.setState({roomList : roomList});
    });
  }

  joinRoom(roomID) {
    let userList;
    let roomDetails;
    for(var room in this.state.roomList) {
      if(this.state.roomList[room].id === roomID) {
        userList = this.state.roomList[room].players;
        roomDetails = this.state.roomList[room];
      }
    }
    this.setState({lobby: false, selectedRoom : roomID, userList: userList, roomDetails : roomDetails});
    console.log(userList);
    console.log(this.state.userList);
    socket.emit(config.socket.joinRoom, { id : roomID });
  }

  createRoom(roomPayload) {
    socket.emit(config.socket.createRoom, roomPayload);
    this.displayList();
  }

  displayList() {
    this.setState({displayList : !this.state.displayList})
  }

  leaveGame() {
    socket.emit(config.socket.leaveRoom, { id : this.state.selectedRoom });
    this.setState({lobby : true, selectedRoom : ''});
  }

  render() {
    const roomList = this.state.roomList.map((room) =>
      <tr key={room.id}>
        <td>{room.name}</td>
        <td>{room.host.username}</td>
        <td>{room.deck.name}</td>
        <td>
          <Link to="" onClick={this.joinRoom.bind(this, room.id)}>
            <Button bsStyle="info" >
              Join
            </Button>
          </Link>
        </td>
      </tr>
    );

    var users = [];
    if(this.state.selectedRoom !== '') {
      for(var room in this.state.roomList) {
        if(this.state.roomList[room].id === this.state.selectedRoom) {
          users = this.state.roomList[room].players;
        }
      }
    }
    const userList = users.map((user) => {

      console.log(user);

      return (<tr key={user.id}>
        <td>
          {user.username}
        </td>
      </tr>);
    }
    );

    let displayElement = null;

    if(this.state.lobby) {
      displayElement = this.state.displayList ?
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
    else {
      displayElement =
        <Grid>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <b>Room:</b> {this.state.roomDetails.name}
              <br/>
              <b>Host:</b> {this.state.roomDetails.host.username}
              <br/>
              <b>Deck:</b> {this.state.roomDetails.deck.name}
              <br/>
              <b>Number of Questions:</b> {this.state.roomDetails.deck.numProblems}
              <br/>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              These users are in the room:
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Username</th>
                </tr>
                </thead>
                <tbody>
                  {userList}
                </tbody>
              </Table>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
          <Row>
            <Col xs={1} md={3}></Col>
            <Col xs={12} md={6}>
              <Button bsStyle="info" onClick={this.leaveGame}>
                Back to Lobby
              </Button>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
        </Grid>
    }

    return (
      <div>
        <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Lobby</small></PageHeader>
        {displayElement}
      </div>
    )
  }
}