import React, {Component} from 'react'
import {Link} from "react-router";
import { PageHeader, Panel, Grid, Col, Row, FormGroup, Button } from 'react-bootstrap';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            (this.props.auth && this.props.userRole!=='student')?
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Dashboard</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={4}></Col>
                        <Col xs={4} md={4}>
                            <Panel style={{textAlign: "center"}}>
                                <FormGroup><Button bsStyle="info" ><Link style={{color: "#ffffff"}} to="deckconfig" >Try practice mode</Link></Button></FormGroup>
                                <FormGroup><Button bsStyle="info" ><Link style={{color: "#ffffff"}} to="users">User management</Link></Button></FormGroup>
                            </Panel>
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Grid>
            </div>
            :<div/>
        )
    }
}
