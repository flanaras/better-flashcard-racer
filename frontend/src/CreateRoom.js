import React, { Component } from 'react'
import config from './../config.json'
import LoadJson from "./services/LoadJson";
import {Link} from "react-router";
import DeckConfig from './DeckConfig'
import { PageHeader, Form, Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';

export default class CreateRoom extends Component {
    constructor(){
        super();
        this.state = {
            roomName: ''
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.roomNameChange = this.roomNameChange.bind(this)
    }

    submitHandler() {
        console.log('submitted!')
    }

    roomNameChange(e) {
        this.setState({roomName: e.target.value})
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Create Room</PageHeader>
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
                <DeckConfig createRoomSubmitter={this.submitHandler}/>
            </div>
            )
    }
}