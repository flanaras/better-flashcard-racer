import React from 'react';
import { PageHeader, Grid, Row, Col, Panel, FormControl, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserSettings from './UserSettings';

export default class Solutions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            countCorrect: 0,
            countIncorrect: 0
        }

        this.props.chosenDeck.map((flashcard) => (
                flashcard.check? this.state.countCorrect++ : this.state.countIncorrect++
            )
        )
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center", marginBottom: 0}}>
                    Flashcard Racer <small>{this.props.route.name}</small>
                </PageHeader>
                <UserSettings routes={this.props.routes} userInfo={this.props.userInfo} logout={this.props.logout}/>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={3}></Col>
                        <Col xs={12} md={6}>
                            <Panel style={{textAlign: "center"}}>
                                <h4>Correct answers: {this.state.countCorrect}</h4>
                                <h4>Incorrect answers: {this.state.countIncorrect}</h4>
                                <ListGroup>
                                    {
                                        this.props.chosenDeck.map((flashcard, index) => (
                                                <ListGroupItem header={'Problem ' + (index+1) + ':'} key={index} bsStyle={flashcard.check? "success": "danger"}>
                                                    <p style={{display: 'inline'}}>Question:</p>
                                                    {' '}
                                                    <FormControl type="text" readOnly style={{textAlign: "right", width: 60, display: 'inline'}} placeholder={flashcard.problem} />
                                                    {' '}
                                                    <p style={{display: 'inline'}}>Your answer:</p>
                                                    {' '}
                                                    <FormControl type="text" readOnly style={{textAlign: "right", width: 60, display: 'inline'}} placeholder={flashcard.answer} />
                                                    {' '}
                                                    <p style={{display: 'inline'}}>Correct answer:</p>
                                                    {' '}
                                                    <FormControl type="text" readOnly style={{textAlign: "right", width: 60, display: 'inline'}} placeholder={flashcard.solution} />
                                                </ListGroupItem>
                                            )
                                        )
                                    }
                                </ListGroup>
                                    <LinkContainer to={{ pathname: '/deckconfig'}}>
                                        <Button bsStyle="info">Play another deck</Button>
                                    </LinkContainer>
                                    {' '}
                                    <LinkContainer to={{ pathname: '/dashboard'}}>
                                        <Button bsStyle="info">Home</Button>
                                    </LinkContainer>
                            </Panel>
                        </Col>
                        <Col xs={1} md={3}></Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

Solutions.PropTypes = {
    countCorrect:       React.PropTypes.number.isRequired,
    countIncorrect:     React.PropTypes.number.isRequired
}