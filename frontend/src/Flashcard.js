import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Panel, Button, FormGroup, FormControl, ControlLabel, ProgressBar } from 'react-bootstrap';

export class Flashcard extends Component {

    constructor(props) {
        super(props);
        this.state = { solution : '', inputState: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.disableInput = this.disableInput.bind(this);
    }

    handleInputChange(event) {
        this.setState({solution: event.target.value});
        this.props.sendAnswer(event.target.value);
    }

    isSolutionCorrect(solution) {
        return this.props.flashcard.solution === parseInt(solution);
    }

    disableInput() {
        this.setState({inputState: true});
    }

    render() {
        var opts = {};
        if (this.state.inputState)
            opts['disabled'] = 'disabled';
        return (
            <div>
                <FormGroup controlId="flashcard">
                    <ControlLabel>{this.props.flashcard.problem}</ControlLabel>
                    <FormControl type="text" {...opts} style={{textAlign: "center"}} placeholder="Your solution" value={this.state.solution} onChange={this.handleInputChange} />
                    <TimeCounter disableInput={this.disableInput} timePerProblem={this.props.timePerProblem} remProb={this.props.remProb} completeQuestion={this.props.completeQuestion} />
                </FormGroup>
            </div>
        )
    }
}

export class TimeCounter extends Component {

    constructor(props) {
        super(props);
        this.state = { elapsed: 0, backRemProb: this.props.remProb, remTime: this.props.timePerProblem, barPerc: 100, barStyle: 'success'};

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 250);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({elapsed: this.state.elapsed+250,
            remTime: this.props.timePerProblem - Math.round(this.state.elapsed / 1000),
            barPerc: Math.round((this.state.remTime/this.props.timePerProblem) * 100)
        });

        if(this.state.backRemProb != this.props.remProb)
            this.setState({elapsed: 0, backRemProb: this.props.remProb});

        if(this.state.barPerc >= 66)
            this.setState({barStyle: 'success'});
        else if(this.state.barPerc >= 33 && this.state.barPerc < 66)
            this.setState({barStyle: 'warning'});
        else if(this.state.barPerc < 33 )
            this.setState({barStyle: 'danger'});

        if(this.state.elapsed >= this.props.timePerProblem*1000) {
            this.setState({elapsed: 0});
            if (this.props.remProb===0) {
                clearInterval(this.timer);
                this.props.disableInput();
            } else {
                this.props.completeQuestion();
            }
        }
    }

    render() {
        return (
            <div>
                <ProgressBar active bsStyle={this.state.barStyle} now={this.state.barPerc} label={this.state.remTime + ' s'} />
            </div>

        )
    }
}

export class FlashcardPractice extends Component {

    constructor(props) {
        super(props);

        this.state = { questionsAnswered : 0, answers : [], currentAnswer : '' };

        this.updateAnswer = this.updateAnswer.bind(this);
        this.completeQuestion = this.completeQuestion.bind(this);
    }

    completeQuestion() {
        let flashcard = this.props.chosenDeck.flashcards[this.state.questionsAnswered];
        flashcard.answer = this.state.currentAnswer;

        flashcard.check = parseInt(flashcard.answer) === flashcard.solution? true: false;

        this.state.answers.push(flashcard);

        if(this.state.questionsAnswered < this.props.chosenDeck.flashcards.length - 1) {
            this.setState({ questionsAnswered : this.state.questionsAnswered + 1 });
        }
        else {
            this.props.submitAnswers(this.state.answers);
        }
    }

    updateAnswer(answer) {
        this.setState({currentAnswer : answer});
    }

    render() {
        return (
            <div>
                <PageHeader style={{textAlign: "center"}}>Flashcard Racer <small>Go!</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={4}></Col>
                        <Col xs={4} md={4}>
                            <FormControl type="text" disabled style={{textAlign: "center", width: 60}} placeholder={(this.state.questionsAnswered+1) + '/' + this.props.gameLengthProblems} />
                            <Panel collapsible style={{textAlign: "center"}} expanded={true}>
                                <Flashcard flashcard={this.props.chosenDeck.flashcards[this.state.questionsAnswered]} sendAnswer={this.updateAnswer} timePerProblem={this.props.timePerProblem} remProb={this.props.gameLengthProblems-this.state.questionsAnswered-1} completeQuestion={this.completeQuestion}/>
                                <Button bsStyle="info" onClick={this.completeQuestion}>{(this.state.questionsAnswered !== this.props.chosenDeck.flashcards.length - 1) ? 'Next Question' : 'Complete Session'}</Button>
                            </Panel>
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}