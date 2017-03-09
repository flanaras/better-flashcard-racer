import React, { Component } from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";
import {Link} from "react-router";
import DeckConfig from './DeckConfig'
import { PageHeader, Form, Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';
import {browserHistory} from "react-router";

const useSockets = true;

export default class CreateRoom extends Component {
    constructor(){
        super();
        this.state = {
            roomName: ''
        }
        this.submitCreateRoom = this.submitCreateRoom.bind(this)
        this.roomNameChange = this.roomNameChange.bind(this)
    }

    async submitCreateRoom(chosenDeck, gameLengthProblems, timePerProblem) {
        console.log('submitted!')
        const roomPayload = {
            name: this.state.roomName,
            //:TODO replace with state.user object when user-management done
            host: {
                "id": 2,
                "auth_level": "teacher",
                "username": "Teachername"
            },
            deck: chosenDeck
        }
        if(useSockets) {
            this.props.createRoom(roomPayload);
        } else {
            let response = await LoadJson(`${config.mock_url}/rooms`, 'POST', roomPayload)
            browserHistory.push('/');
        }
    }

    roomNameChange(e) {
        this.setState({roomName: e.target.value})
    }

    render() {
        return (
            <div>
                {/*<PageHeader style={{textAlign: "center"}}>Create Room</PageHeader>*/}
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={4}></Col>
                        <Col xs={4} md={4}>
                            <Panel style={{textAlign: "center"}}>
                                <FormGroup controlId="roomname">
                                    <ControlLabel>Room name</ControlLabel>
                                    {' '}
                                    <FormControl type="text" style={{textAlign: "center"}} placeholder="Enter a name for the room" onChange={this.roomNameChange}/>
                                </FormGroup>
                            </Panel>
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Grid>
                <DeckConfig onSubmitGameConfig={this.submitCreateRoom} chosenDeck={this.props.chosenDeck}/>
            </div>
            )
    }
}