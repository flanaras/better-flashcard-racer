import React, {Component} from 'react';
import config from './../config.json';
import LoadJson from "./services/LoadJson";
import { DropdownButton, MenuItem, Navbar, Grid, Row, Col } from 'react-bootstrap';
import Breadcrumbs from 'react-breadcrumbs';

export default class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLogout = this.onLogout.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    async apiCall(endpoint, userid) {
        const url = `${config.mock_api_url}/${endpoint}/${userid}`;
        const logoutAck = await LoadJson(url, 'POST');
        if (logoutAck === 'ok') {
            this.props.logout();
        }
    }

    onLogout() {
        this.apiCall('logout', this.props.userid);
    }

    render() {
        return (
            this.props.auth?
                <Navbar >
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={8} style={{marginTop: 15}}>
                                <div style={{textAlign: 'left', fontSize: 15}}>
                                    <Breadcrumbs
                                        routes={this.props.routes}
                                    />
                                </div>
                            </Col>
                            <Col xs={6} md={4} style={{marginTop: 10}}>
                                <div style={{textAlign: 'right'}}>
                                    <DropdownButton bsStyle={'info'} bsSize={'small'} title={this.props.username} >
                                        <MenuItem eventKey="1" onClick={this.onLogout}>Sign out</MenuItem>
                                    </DropdownButton>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Navbar>
            :<div/>
        )
    }
}
