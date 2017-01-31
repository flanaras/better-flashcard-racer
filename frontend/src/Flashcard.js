import React, { Component } from 'react';

export class Flashcard extends Component {

  constructor(props) {
    super(props);
    this.state = { solution : '' };

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({solution: event.target.value});
    this.props.sendAnswer(event.target.value);
  }

  isSolutionCorrect(solution) {
    return this.props.flashcard.solution === parseInt(solution);
  }

  render() {
    return (
      <div>
        <p>{this.props.flashcard.problem}</p>
        <input type="text" placeholder="Your solution" value={this.state.solution} onChange={this.handleInputChange}/>
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

    this.state.answers.push(flashcard);

    if(this.state.questionsAnswered < this.props.chosenDeck.flashcards.length - 1) {
      this.setState({ questionsAnswered : this.state.questionsAnswered + 1 })
    }
    else {
      //TODO: end the session -> send the answers to the parent component
      /*
        Something along the lines of:
        this.props.submitAnswers(this.state.answers);
       */
    }
  }

  updateAnswer(answer) {
    this.state.currentAnswer = answer;
  }

  render() {
    return (
      <div>
        <Flashcard flashcard={this.props.chosenDeck.flashcards[this.state.questionsAnswered]} sendAnswer={this.updateAnswer}/>
        <button onClick={this.completeQuestion}>{(this.state.questionsAnswered !== this.props.chosenDeck.flashcards.length - 1) ? 'Next Question' : 'Complete Session'}</button>
      </div>
    )
  }
}
