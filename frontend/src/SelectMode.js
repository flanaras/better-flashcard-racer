import React, {Component} from 'react'
import {Link} from "react-router";
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, Panel, Grid, Col, Row } from 'react-bootstrap';

export default class SelectMode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Welcome</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={4}></Col>
                        <Col xs={4} md={4}>
                            <Panel style={{textAlign: "center"}}>
                                <form>
                                    <FormGroup controlId="username">
                                        <ControlLabel>Username:</ControlLabel>
                                        {' '}
                                        <FormControl type="text" style={{textAlign: "center"}} placeholder="Enter your username" />
                                    </FormGroup>
                                    {' '}
                                    <FormGroup controlId="password">
                                        <ControlLabel>Password:</ControlLabel>
                                        {' '}
                                        <FormControl type="password" style={{textAlign: "center"}} placeholder="Enter your password" />
                                    </FormGroup>
                                    {' '}
                                    <Button bsStyle="info" type="submit">
                                        Sign in
                                    </Button>
                                </form>
                                <Link to="deckconfig" >Try practice mode</Link>
                            </Panel>
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}