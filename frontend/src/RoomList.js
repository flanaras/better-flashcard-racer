import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import config from './../config.json'
import {Link} from "react-router";
import LoadJson from "./services/LoadJson"
import { PageHeader, Form, Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';

export default class RoomList extends React.Component {
    constructor() {
        super()
        this.state = {
            rooms: [],
            chosenRoom: {}
        }
    }

    componentDidMount() {
        this.apiCall('rooms')
    }

    async apiCall(endpoint) {
        const url = `${config.mock_url}/${endpoint}`
        let rooms = await LoadJson(url)
        this.setState({rooms})
        this.setState({chosenRoom: rooms[0]})
    }

    showUsername(cell, row) {
        return cell.username;
    }

    showDeckName(cell, row) {
        return cell.name;
    }

    render() {

        const selectRowProp = {
            mode: 'radio',
            bgColor: 'pink',
            hideSelectColumn: true,
            clickToSelect: true
        };

        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Rooms</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={3}></Col>
                        <Col xs={18} md={20}>
                            <Panel style={{textAlign: "center"}}>
                                <BootstrapTable data={ this.state.rooms } striped={ true } hover={ true } condensed={ true } selectRow={ selectRowProp }>
                                    <TableHeaderColumn dataField='id' isKey={ true }>Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='deck' dataFormat={this.showDeckName}>Deck</TableHeaderColumn>
                                    <TableHeaderColumn dataField='host' dataFormat={this.showUsername}>Host</TableHeaderColumn>
                                    <TableHeaderColumn dataField='host' dataFormat={() => (<Link to="room" >Join</Link>)}>Join Game</TableHeaderColumn>
                                </BootstrapTable>
                                <Link to="deckconfig" >Try practice mode</Link>
                            </Panel>
                        </Col>
                        <Col xs={1} md={3}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}