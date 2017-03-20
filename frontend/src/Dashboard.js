import React, {Component} from 'react'
import {Link} from "react-router";
import { PageHeader, Panel, Grid, Col, Row, FormGroup, Button } from 'react-bootstrap';
import UserSettings from './UserSettings';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.loadUserInfo();
    }

    render() {
        if(this.props.children) {
            return (React.cloneElement(this.props.children, {
                loadUserInfo: this.props.loadUserInfo,
                userInfo: this.props.userInfo,
                logout: this.props.logout,
                routes: this.props.routes
            }));
        } else {
            return (
                this.props.userInfo.auth ?
                    <div>
                        <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                            Flashcard Racer <small>{this.props.route.name}</small>
                        </PageHeader>
                        <UserSettings routes={this.props.routes} userInfo={this.props.userInfo} logout={this.props.logout}/>
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={1} md={4}></Col>
                                <Col xs={4} md={4}>
                                    <Panel style={{textAlign: "center"}}>
                                        <FormGroup><Button bsStyle="info"><Link style={{color: "#ffffff"}}
                                                                                to="deckconfig">Try practice mode</Link></Button></FormGroup>
                                        <FormGroup><Button style={{display: (this.props.userInfo.userRole !== 'student'?'initial':'none')}} bsStyle="info"><Link style={{color: "#ffffff"}}
                                                                                to="dashboard/users">User
                                            management</Link></Button></FormGroup>
                                        <FormGroup>
                                            <Button bsStyle="info">
                                                <Link style={{color : '#fff'}} to="lobby">
                                                    {this.props.userInfo.userRole !== 'student'?'Room management':'Available room'}
                                                </Link>
                                            </Button>
                                        </FormGroup>

                                    </Panel>
                                </Col>
                                <Col xs={1} md={4}></Col>
                            </Row>
                        </Grid>
                    </div>
                    : <div/>
            )
        }
    }
}
