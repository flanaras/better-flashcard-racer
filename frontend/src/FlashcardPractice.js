import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Panel, Button, FormControl } from 'react-bootstrap';
import Flashcard from './Flashcard';

export default class FlashcardPractice extends Component {

  constructor(props) {
    super(props);

    this.state = { questionsAnswered : 0, answers : [], currentAnswer : '', checkAnswer : false };

    this.updateAnswer = this.updateAnswer.bind(this);
    this.completeQuestion = this.completeQuestion.bind(this);
  }

  completeQuestion() {
    let flashcard = this.props.chosenDeck.flashcards[this.state.questionsAnswered];
    flashcard.answer = this.state.currentAnswer;
    flashcard.check = this.state.checkAnswer;

    this.state.answers.push(flashcard);

    if(this.state.questionsAnswered < this.props.chosenDeck.flashcards.length - 1) {
      this.setState({ questionsAnswered : this.state.questionsAnswered + 1 });
    }
    else {
      this.props.submitAnswers(this.state.answers);
    }
  }

  updateAnswer(answer, check) {
    this.setState({currentAnswer : answer, checkAnswer : check});
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
                <Flashcard flashcard={this.props.chosenDeck.flashcards[this.state.questionsAnswered]}
                           sendAnswer={this.updateAnswer}
                           submitAnswer={this.completeQuestion}
                           timePerProblem={this.props.timePerProblem}
                           remProb={this.props.gameLengthProblems-this.state.questionsAnswered-1}/>
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
